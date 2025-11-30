import { Router } from 'express';
import { obterUsuarioLogado } from '../controllers/usersControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();
router.get("/me", authMiddleware, obterUsuarioLogado);

export default router;
