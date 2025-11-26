import { Router } from 'express';
import feedbackController from '../controllers/feedbackController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/:cursoId', authMiddleware, feedbackController.criarFeedback); // Criar feedback
router.get('/:cursoId', authMiddleware, feedbackController.listarFeedbacks); // Listar feedbacks

export default router;
