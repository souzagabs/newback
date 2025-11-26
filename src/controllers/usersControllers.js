import prisma from '../models/prisma.js';

const usuarioController = {
  async listarUsuarios(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }
};

export default usuarioController;
