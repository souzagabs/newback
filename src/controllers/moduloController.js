import prisma from '../models/prisma.js';

async function criarModulo(req, res) {
  const { cursoId, titulo, tipoConteudo, urlConteudo } = req.body;
  const { id: userId, role } = req.user;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar módulos" });
  }

  try {
    const modulo = await prisma.modulo.create({
      data: {
        cursoId,
        titulo,
        tipoConteudo,
        urlConteudo,
      },
    });
    return res.status(201).json(modulo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar módulo" });
  }
}
o
async function listarModulos(req, res) {
  const { cursoId } = req.params;

  try {
    const modulos = await prisma.modulo.findMany({
      where: { cursoId: parseInt(cursoId) },
    });
    return res.status(200).json(modulos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar módulos" });
  }
}

export default {
  criarModulo,
  listarModulos,
};
