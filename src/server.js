import 'dotenv/config';
import express from 'express';
import loginRoutes from './routes/loginRoutes.js';
import cursoRoutes from './routes/cursoRoutes.js';
import moduloRoutes from './routes/moduloRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersmeRoutes.js"; 
import authMiddleware from './middleware/authMiddleware.js';
import progressoRoutes from "./routes/progressoRoutes.js";

const app = express();
app.set('trust proxy', true);

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://newfront-self.vercel.app",
    "https://newfront-k9tmev161-gabriel-brasils-projects-25ec471f.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use('/login', loginRoutes);
app.use('/auth', authRoutes);

app.use('/cursos', cursoRoutes);
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.use('/progresso', authMiddleware, progressoRoutes);
app.use('/modulos', authMiddleware, moduloRoutes);
app.use('/quizzes', authMiddleware, quizRoutes);
app.use('/feedbacks', authMiddleware, feedbackRoutes);
app.use('/usuarios', authMiddleware, usersRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server rodando na porta " + port);
});
