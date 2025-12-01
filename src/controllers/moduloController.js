import prisma from '../models/prisma.js';

async function criarModulo(req, res) {
  const { titulo, tipoConteudo, urlConteudo } = req.body;
  const { cursoId } = req.params;
  const { id: userId, role } = req.user;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem criar módulos" });
  }

  try {
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

async function atualizarModulo(req, res) {
  const { moduloId } = req.params;
  const { titulo, tipoConteudo, urlConteudo } = req.body;
  const { id: userId, role } = req.user;

  if (role !== "INSTRUTOR") {
    return res.status(403).json({ error: "Somente instrutores podem editar módulos" });
  }

  try {
    const modulo = await prisma.modulo.findUnique({
      where: { id: parseInt(moduloId) },
      include: { curso: true }
    });

    if (!modulo) {
      return res.status(404).json({ error: "Módulo não encontrado" });
    }

    if (modulo.curso.instrutorId !== userId) {
      return res.status(403).json({ error: "Você não é o instrutor deste curso" });
    }

    const atualizado = await prisma.modulo.update({
      where: { id: parseInt(moduloId) },
      data: { titulo, tipoConteudo, urlConteudo }
    });

    return res.status(200).json(atualizado);

  } catch (error) {
    console.error("Erro ao atualizar módulo:", error);
    return res.status(500).json({ error: "Erro ao atualizar módulo" });
  }
}

async function deletarModulo(req, res) {
  const { moduloId } = req.params;
  const { id: userId, role } = req.user;

  if (role !== 'INSTRUTOR') {
    return res.status(403).json({ error: "Somente instrutores podem deletar módulos" });
  }

  try {
    const modulo = await prisma.modulo.findUnique({
      where: { id: parseInt(moduloId) },
      include: { curso: true }
    });

    if (!modulo) {
      return res.status(404).json({ error: "Módulo não encontrado" });
    }

    if (modulo.curso.instrutorId !== userId) {
      return res.status(403).json({ error: "Você não é o instrutor deste curso" });
    }

    await prisma.modulo.delete({
      where: { id: parseInt(moduloId) }
    });

    return res.status(200).json({ message: "Módulo removido com sucesso" });

  } catch (error) {
    console.error("Erro ao deletar módulo:", error);
    return res.status(500).json({ error: "Erro ao deletar módulo" });
  }
}


   //ATUALIZAR MÓDULOS EM LOTE (usado quando clica em SALVAR NO CURSO)
 
async function atualizarModulosEmLote(req, res) {
  const { cursoId } = req.params;
  const { modulos } = req.body;
  const { id: userId } = req.user;

  try {
    // Verifica curso
    const curso = await prisma.curso.findUnique({
      where: { id: parseInt(cursoId) },
      include: { modulos: true }
    });

    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    if (curso.instrutorId !== userId) {
      return res.status(403).json({ error: "Você não é o instrutor deste curso" });
    }

    const existentes = curso.modulos.map((m) => m.id);
    const recebidos = modulos.map((m) => m.id).filter(Boolean);

    // Remove módulos excluídos
    const remover = existentes.filter((id) => !recebidos.includes(id));

    if (remover.length > 0) {
      await prisma.modulo.deleteMany({
        where: { id: { in: remover } }
      });
    }

    // Criar e atualiza
    for (const m of modulos) {
      if (m.id && existentes.includes(m.id)) {
        await prisma.modulo.update({
          where: { id: m.id },
          data: {
            titulo: m.titulo,
            tipoConteudo: m.tipoConteudo,
            urlConteudo: m.urlConteudo,
          },
        });
      } else {
        await prisma.modulo.create({
          data: {
            cursoId: parseInt(cursoId),
            titulo: m.titulo,
            tipoConteudo: m.tipoConteudo,
            urlConteudo: m.urlConteudo,
          },
        });
      }
    }

    return res.status(200).json({ message: "Módulos atualizados com sucesso" });

  } catch (error) {
    console.error("Erro ao atualizar módulos em lote:", error);
    return res.status(500).json({ error: "Erro ao atualizar módulos" });
  }
}

export default {
  criarModulo,
  listarModulos,
  atualizarModulo,
  deletarModulo,
  atualizarModulosEmLote
};
