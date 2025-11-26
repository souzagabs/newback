import prisma from '../models/prisma.js';

const quizController = {
  async criarQuiz(req, res) {
    const { pergunta, opcoes, respostaCorreta, moduloId } = req.body;
    try {
      const quiz = await prisma.quiz.create({
        data: { pergunta, opcoes, respostaCorreta, moduloId }
      });
      res.status(201).json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar quiz' });
    }
  },

  async listarQuizzes(req, res) {
    const { moduloId } = req.params;
    try {
      const quizzes = await prisma.quiz.findMany({
        where: { moduloId: parseInt(moduloId) }
      });
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar quizzes' });
    }
  }
};

export default quizController;