import express from 'express'
import loginRoutes from './routes/loginRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import moduloRoutes from './routes/moduloRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import authMiddleware from './middleware/authMiddleware.js';

const app = express()
app.use(cors());
app.use(express.json());

app.use('/login', loginRoutes);
app.use("/auth", authRoutes);
app.use('/cursos', cursoRoutes);
app.use('/modulos', moduloRoutes);
app.use('/quizzes', quizRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/usuarios', usersRoutes)
app.use('/cursos', authMiddleware, cursoRoutes);

app.listen(3000, ()=>{
    console.log("Servidor Ligadão")
})