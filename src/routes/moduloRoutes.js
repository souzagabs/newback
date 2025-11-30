import { Router } from 'express';
import moduloController from '../controllers/moduloController.js';

const router = Router();

router.get('/:cursoId/:moduloId', moduloController.listarModulos); // Adicionando :moduloId
router.post('/:cursoId', moduloController.criarModulo);

export default router;
