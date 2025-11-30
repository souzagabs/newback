import { Router } from 'express';
import moduloController from '../controllers/moduloController.js';

const router = Router();

router.get('/:cursoId/:moduloId', moduloController.listarModulos);
router.post('/:cursoId', moduloController.criarModulo);

export default router;
