import { Router } from 'express';
import cursoController from '../controllers/cursoController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { inscreverCurso } from "../controllers/inscricaoController.js"; 

const router = Router();

router.get('/', cursoController.listarCursos); 

// router.get('/cursos/meuscursos', ...)

router.get('/meuscursos', authMiddleware, cursoController.listarMeusCursos);
router.get('/meuscursos/instrutor', authMiddleware, cursoController.listarCursosPorInstrutor); 

router.post('/', authMiddleware, cursoController.criarCurso);
router.post("/inscricoes", authMiddleware, inscreverCurso);
router.get('/:id', cursoController.listarCursoPorId);
router.delete('/:id', authMiddleware, cursoController.deletarCurso);
router.put('/:id', authMiddleware, cursoController.atualizarCurso);

export default router;