import prisma from "../models/prisma.js";

export async function inscreverCurso(req, res) {
  const { cursoId } = req.body;
  const { id: usuarioId } = req.user; 

  try {
    if (!cursoId) {
      return res.status(400).json({ error: "cursoId é obrigatório." });
    }

    // Verifica se o usuário existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Verifica se o curso existe
    const cursoExistente = await prisma.curso.findUnique({
      where: { id: cursoId },
    });

    if (!cursoExistente) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }

    // Verifica se o usuário já está inscrito no curso
    const inscricaoExistente = await prisma.inscricao.findUnique({
      where: {
        userId_cursoId: {
          userId: usuarioId,
          cursoId: cursoId,
        },
      },
    });

    if (inscricaoExistente) {
      return res.status(400).json({ error: "Você já está inscrito neste curso." });
    }

    const inscricao = await prisma.inscricao.create({
      data: {
        userId: usuarioId,
        cursoId: cursoId,
      },
    });

    return res.status(201).json(inscricao);
  } catch (error) {
    console.error("Erro ao criar inscrição:", error);
    return res.status(500).json({ error: "Erro ao inscrever-se no curso." });
  }
}
