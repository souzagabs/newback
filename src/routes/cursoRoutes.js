import { Router } from 'express';
import cursoController from '../controllers/cursoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, cursoController.criarCurso);
router.get('/', cursoController.listarCursos);
router.delete('/:id', authMiddleware, cursoController.deletarCurso);
router.put('/:id', authMiddleware, cursoController.atualizarCurso);
router.get('/meuscursos', authMiddleware, cursoController.listarCursosPorInstrutor);
router.get('/:id', cursoController.listarCursoPorId);
export default router;
