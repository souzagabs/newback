import { Router } from 'express';
import quizController from '../controllers/quizController.js';

const router = Router();

router.post('/criar', quizController.criarQuiz);
router.get('/:moduloId/listar', quizController.listarQuizzes);

export default router;