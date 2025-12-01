import { Router } from "express";
import progressoController from "../controllers/progressoController.js";

const router = Router();

router.get("/:cursoId/:moduloId", progressoController.getProgresso);
router.post("/:cursoId/:moduloId/concluir", progressoController.concluirModulo);
router.put("/:cursoId/:moduloId", progressoController.atualizarProgresso);

export default router;
