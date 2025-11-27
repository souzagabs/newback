import prisma from "../models/prisma.js";

async function listarCursos(req, res) {
  try {
    const cursos = await prisma.curso.findMany({
      include: {
        instrutor: true,
      },
    });

    return res.status(200).json(cursos);
  } catch (error) {
    console.error("Erro ao listar cursos:", error);
    return res.status(500).json({ error: "Erro ao listar cursos" });
  }
}

async function criarCurso(req, res) {
  const { nome, descricao} = req.body;
  const { id: userId, role } = req.user;

  if (role !== "INSTRUTOR") {
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
    console.error("Erro ao criar curso:", error);
    return res.status(500).json({ error: "Erro ao criar curso" });
  }
}

async function listarCursosPorInstrutor(req, res) {
  const { id: userId, role } = req.user;

  if (role !== "INSTRUTOR") {
    return res.status(403).json({ error: "Acesso negado" });
  }

  try {
    console.log("Listando cursos para o instrutor:", userId); 
    const cursos = await prisma.curso.findMany({
      where: {
        instrutorId: userId,
      },
      include: {
        modulos: true, 
      },
    });

    console.log("Cursos encontrados:", cursos); // Verifique o que está sendo retornado
    return res.status(200).json(cursos);
  } catch (error) {
    console.error("Erro ao listar cursos do instrutor:", error);
    return res.status(500).json({ error: "Erro ao listar cursos" });
  }
}

async function listarCursoPorId(req, res) {
  const { id } = req.params;  
  console.log("ID recebido da URL:", id);

  try {
    // Garante que o ID seja um número
    const cursoId = parseInt(id, 10);
    if (isNaN(cursoId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // Busca o curso, incluindo os módulos e o instrutor
    const curso = await prisma.curso.findUnique({
      where: { id: cursoId },  
      include: {
        instrutor: true,  
        modulos: true,    
      },
    });

    console.log("Curso encontrado:", curso);  

    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    return res.status(200).json(curso);  // Retorna os detalhes do curso
  } catch (error) {
    console.error("Erro ao buscar curso:", error);
    return res.status(500).json({ error: "Erro ao buscar curso", details: error.message });
  }
}

async function atualizarCurso(req, res) {
  const { id } = req.params;
  const { nome, descricao } = req.body;
  const { id: userId, role } = req.user;

  if (role !== "INSTRUTOR") {
    return res.status(403).json({ error: "Apenas instrutores podem atualizar cursos" });
  }

  try {
    const curso = await prisma.curso.findUnique({
      where: { id: parseInt(id) },
    });

    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    // garante que o instrutor logado é o dono do curso
    if (curso.instrutorId !== userId) {
      return res.status(403).json({ error: "Você não é o dono deste curso" });
    }

    const cursoAtualizado = await prisma.curso.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        descricao
      },
    });

    return res.status(200).json(cursoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    return res.status(500).json({ error: "Erro ao atualizar curso" });
  }
}

async function deletarCurso(req, res) {
  const { id } = req.params;
  const { id: userId, role } = req.user;

  if (role !== "INSTRUTOR") {
    return res.status(403).json({ error: "Apenas instrutores podem deletar cursos" });
  }

  try {
    const curso = await prisma.curso.findUnique({
      where: { id: parseInt(id) },
    });

    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    if (curso.instrutorId !== userId) {
      return res.status(403).json({ error: "Você não é o dono deste curso" });
    }

    await prisma.curso.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Curso deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    return res.status(500).json({ error: "Erro ao deletar curso" });
  }
}

export default {
  listarCursos,
  criarCurso,
  listarCursosPorInstrutor,
  listarCursoPorId,
  atualizarCurso,
  deletarCurso,
};