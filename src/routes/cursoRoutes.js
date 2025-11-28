import { Router } from 'express';
import cursoController from '../controllers/cursoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', cursoController.listarCursos); 
router.get('/:id', cursoController.listarCursoPorId);
router.get('/cursos/meuscursos', authMiddleware, cursoController.listarCursosPorInstrutor);
router.post('/', authMiddleware, cursoController.criarCurso);
router.delete('/:id', authMiddleware, cursoController.deletarCurso);
router.put('/:id', authMiddleware, cursoController.atualizarCurso);

export default router;
