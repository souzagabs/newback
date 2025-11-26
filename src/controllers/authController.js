import prisma from "../models/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  // REGISTER
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ error: "Campos obrigatórios faltando" });

      const userExists = await prisma.usuario.findUnique({ where: { email } });

      if (userExists)
        return res.status(400).json({ error: "Email já cadastrado" });

      const hashed = await bcrypt.hash(password, 10);

      const user = await prisma.usuario.create({
        data: {
          nome: name,
          email,
          senha: hashed,
          role: role || "ALUNO",
        },
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: {
          id: user.id,
          name: user.nome,
          email: user.email,
          role: user.role,
        },
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  },

  // LOGIN 
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await prisma.usuario.findUnique({ where: { email } });

      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const valid = await bcrypt.compare(password, user.senha);

      if (!valid) return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({
        message: "Login bem-sucedido",
        token,
        user: {
          id: user.id,
          name: user.nome,
          email: user.email,
          role: user.role,
        },
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro no login" });
    }
  },
};