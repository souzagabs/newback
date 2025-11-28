import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';  // Para segurança da senha
import prisma from '../models/prisma.js';

const loginController = {
  async login(req, res) {
    const { email, senha } = req.body;
    
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificando a senha com bcrypt
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerando o token com o id e role do usuário
    const token = jwt.sign(
     { id: usuario.id, role: usuario.role },  // Aqui estamos passando o ID e a role
     process.env.JWT_SECRET,
     { expiresIn: '1h' }
);

    // Log para verificar o conteúdo do token
    console.log("Token gerado:", token);  // Aqui o token gerado será exibido

    return res.status(200).json({ token });
  }
};

export default loginController;
