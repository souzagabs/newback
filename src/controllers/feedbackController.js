import prisma from '../models/prisma.js';

async function criarFeedback(req, res) {
  const { cursoId, avaliacao, comentario } = req.body;
  const { id: userId, role } = req.user;

  if (role !== 'ALUNO') {
    return res.status(403).json({ error: "Somente alunos podem deixar feedback" });
  }

  try {
    const feedback = await prisma.feedback.create({
      data: {
        cursoId,
        usuarioId: userId,
        avaliacao,
        comentario,
      },
    });
    return res.status(201).json(feedback);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar feedback" });
  }
}

async function listarFeedbacks(req, res) {
  const { cursoId } = req.params;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar cursos" });
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: { cursoId: parseInt(cursoId) },
      include: { usuario: true },
    });
    return res.status(200).json(feedbacks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar feedbacks" });
  }
}

export default {
  criarFeedback,
  listarFeedbacks,
};
