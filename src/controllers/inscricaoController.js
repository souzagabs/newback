import prisma from "../models/prisma.js";

export async function inscreverCurso(req, res) {
  const { cursoId } = req.body;
  const { id: usuarioId } = req.user;

  console.log("Tentando inscrever o usuário", usuarioId, "no curso", cursoId);

  try {
    // Verifica se o usuário já está inscrito
    const inscricaoExistente = await prisma.inscricao.findUnique({
      where: {
        userId_cursoId: { userId: usuarioId, cursoId: cursoId },
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

    console.log("Inscrição criada com sucesso:", inscricao);
    return res.status(201).json(inscricao);
  } catch (error) {
    console.error("Erro ao tentar inscrever no curso:", error);
    return res.status(500).json({ error: "Erro ao inscrever-se no curso." });
  }
}
