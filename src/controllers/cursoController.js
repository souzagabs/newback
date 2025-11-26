import prisma from '../models/prisma.js';

async function criarCurso(req, res) {
  const { nome, descricao } = req.body;
  const { id: userId, role } = req.user; 

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar cursos" });
  }

  try {
    const curso = await prisma.curso.create({
      data: {
        nome,
        descricao,
        instrutorId: userId,
      },
    });
    return res.status(201).json(curso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar curso" });
  }
}

async function listarCursos(req, res) {
  try {
    const cursos = await prisma.curso.findMany({
      include: {
        instrutor: true,
      },
    });
    return res.status(200).json(cursos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar cursos" });
  }
}

async function atualizarCurso(req, res) {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar cursos" });
  }

  try {
    const curso = await prisma.curso.update({
      where: { id: parseInt(id) },
      data: { nome, descricao },
    });
    return res.status(200).json(curso);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar curso" });
  }
}

async function deletarCurso(req, res) {
  const { id } = req.params;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar cursos" });
  }

  try {
    await prisma.curso.delete({ where: { id: parseInt(id) } });
    return res.status(204).send(); // No content, indicando sucesso
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar curso" });
  }
}

export default {
  criarCurso,
  listarCursos,
  atualizarCurso,
  deletarCurso,
};
