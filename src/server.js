import express from 'express';
import loginRoutes from './routes/loginRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import moduloRoutes from './routes/moduloRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import authMiddleware from './middleware/authMiddleware.js';
import cursoController from './controllers/cursoController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/auth', authRoutes);

app.get('/cursos', cursoController.listarCursos);
app.get('/cursos/:id', cursoController.listarCursoPorId);

app.use('/cursos', authMiddleware, cursoRoutes);
app.use('/modulos', authMiddleware, moduloRoutes);
app.use('/quizzes', authMiddleware, quizRoutes);
app.use('/feedbacks', authMiddleware, feedbackRoutes);
app.use('/usuarios', authMiddleware, usersRoutes);

app.listen(3000, () => {
    console.log("Servidor Ligado!");
});
