import prisma from "../models/prisma.js";

export default {

  async getProgresso(req, res) {
    const { cursoId, moduloId } = req.params;
    const userId = req.user.id;

    try {
      let progresso = await prisma.progresso.findUnique({
        where: {
          userId_moduloId: {
            userId,
            moduloId: parseInt(moduloId)
          }
        }
      });

      if (!progresso) {
        progresso = await prisma.progresso.create({
          data: {
            userId,
            cursoId: parseInt(cursoId),
            moduloId: parseInt(moduloId),
            progresso: 0,
            completed: false
          }
        });
      }

      return res.status(200).json(progresso);

    } catch (error) {
      console.error("ERRO AO BUSCAR PROGRESSO:", error);
      return res.status(500).json({ error: "Erro ao buscar progresso" });
    }
  },

  async concluirModulo(req, res) {
    const { cursoId, moduloId } = req.params;
    const userId = req.user.id;

    try {
      const progresso = await prisma.progresso.upsert({
        where: {
          userId_moduloId: {
            userId,
            moduloId: parseInt(moduloId)
          }
        },
        update: {
          completed: true,
          progresso: 100
        },
        create: {
          userId,
          cursoId: parseInt(cursoId),
          moduloId: parseInt(moduloId),
          completed: true,
          progresso: 100
        }
      });

      return res.status(200).json(progresso);

    } catch (error) {
      console.error("ERRO AO MARCAR CONCLUSÃO:", error);
      return res.status(500).json({ error: "Erro ao concluir módulo" });
    }
  },

  async atualizarProgresso(req, res) {
    const { cursoId, moduloId } = req.params;
    const { progresso } = req.body;
    const userId = req.user.id;

    if (progresso < 0 || progresso > 100) {
      return res.status(400).json({ error: "Valor deve estar entre 0 e 100" });
    }

    try {
      const update = await prisma.progresso.upsert({
        where: {
          userId_moduloId: {
            userId,
            moduloId: parseInt(moduloId)
          }
        },
        update: {
          progresso,
          completed: progresso === 100
        },
        create: {
          userId,
          cursoId: parseInt(cursoId),
          moduloId: parseInt(moduloId),
          progresso,
          completed: progresso === 100
        }
      });

      return res.status(200).json(update);

    } catch (error) {
      console.error("ERRO AO ATUALIZAR PROGRESSO:", error);
      return res.status(500).json({ error: "Erro ao atualizar progresso" });
    }
  }
};
