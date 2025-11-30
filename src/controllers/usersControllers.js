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

export const obterUsuarioLogado = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Token inválido ou usuário não autenticado." });
    }

    const usuarioId = req.user.id; 

    // Limitar a busca ao próprio usuário para um ALUNO
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId },
      include: {
          inscricoes: {
            include: {
              curso: true,
            },
          },
        },
      });
    

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    return res.status(200).json(usuario); 

  } catch (err) {
    console.error('Erro ao buscar usuário:', err);
    return res.status(500).json({ message: "Erro ao buscar usuário!" });
  }
};

export default usuarioController;
