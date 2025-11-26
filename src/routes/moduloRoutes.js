import { Router } from 'express';
import moduloController from '../controllers/moduloController.js';

const router = Router();

router.post('/:cursoId', moduloController.criarModulo); // Criar módulo
router.get('/:cursoId', moduloController.listarModulos); // Listar módulos

export default router;
