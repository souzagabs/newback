import { Router } from 'express';
import feedbackController from '../controllers/feedbackController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/:cursoId', authMiddleware, feedbackController.criarFeedback); 
router.get('/:cursoId', authMiddleware, feedbackController.listarFeedbacks); 

export default router;
