import { Router } from 'express';
import usersControllers from '../controllers/usersControllers.js';

const router = Router();

router.get("/", usersControllers.listarUsuarios);

export default router;