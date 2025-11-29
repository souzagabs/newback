import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import prisma from '../models/prisma.js';

const loginController = {
  async login(req, res) {
    const { email, senha } = req.body;
    
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
     { id: usuario.id, role: usuario.role },  
     process.env.JWT_SECRET,
     { expiresIn: '1h' }
);

    // Log para verificar o conteúdo do token
    console.log("Token gerado:", token); 

    return res.status(200).json({ token });
  }
};

export default loginController;
