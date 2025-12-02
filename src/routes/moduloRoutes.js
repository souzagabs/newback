import { Router } from 'express';
import moduloController from '../controllers/moduloController.js';

const router = Router();

router.get('/curso/:cursoId', moduloController.listarModulos);
router.get('/curso/:cursoId/modulo/:moduloId', moduloController.listarModuloEspecifico);

router.post('/:cursoId', moduloController.criarModulo);
router.put('/:moduloId', moduloController.atualizarModulo);
router.delete('/:moduloId', moduloController.deletarModulo);
router.put('/lote/:cursoId', moduloController.atualizarModulosEmLote);

export default router;
