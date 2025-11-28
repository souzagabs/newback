import prisma from '../models/prisma.js';

async function criarModulo(req, res) {
  const { titulo, tipoConteudo, urlConteudo } = req.body;
  const { cursoId } = req.params;
  const { id: userId, role } = req.user;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar módulos" });
  }

  try {
    // Verifica se o curso existe e se pertence ao instrutor logado
    const curso = await prisma.curso.findUnique({
      where: { id: parseInt(cursoId) }
    });

    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    if (curso.instrutorId !== userId) {
      return res.status(403).json({ error: "Você não é o instrutor deste curso" });
    }

    const modulo = await prisma.modulo.create({
      data: {
        cursoId: parseInt(cursoId),
        titulo,
        tipoConteudo,
        urlConteudo,
      },
    });

    return res.status(201).json(modulo);

  } catch (error) {
    console.error("ERRO PRISMA AO CRIAR MÓDULO:", error);
    return res.status(500).json({ error: "Erro ao criar módulo" });
  }
}

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
