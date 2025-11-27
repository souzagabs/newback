import { Router } from 'express';
import cursoController from '../controllers/cursoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', cursoController.listarCursos);  // A função listarCursos deve ser válida e exportada no cursoController
router.get('/:id', cursoController.listarCursoPorId);
router.post('/', authMiddleware, cursoController.criarCurso);
router.delete('/:id', authMiddleware, cursoController.deletarCurso);
router.put('/:id', authMiddleware, cursoController.atualizarCurso);
router.get('/meuscursos', authMiddleware, cursoController.listarCursosPorInstrutor);

export default router;