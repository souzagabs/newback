import { Router } from 'express';
import moduloController from '../controllers/moduloController.js';

const router = Router();

router.post('/:cursoId', moduloController.criarModulo); 
router.get('/:cursoId', moduloController.listarModulos);

export default router;
