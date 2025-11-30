import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
  
  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!req.user.id) {
      console.log("ID do usuário não encontrado no token");
      return res.status(401).json({ error: "Token não contém ID válido" });
    }

    console.log("Usuário autenticado:", req.user);

    if (req.originalUrl.includes('/cursos/meuscursos') || req.originalUrl.includes('/inscricoes')) {
      return next();
    }

    if (req.user.role === "INSTRUTOR") {
      return next();
    }

    // Se o usuário não for instrutor, mas for aluno, ainda podemos permitir a requisição
    if (req.user.role === "ALUNO") {
      return next();  // Permitir acesso às rotas para ALUNO
    }

    // Para outras rotas, validar se é instrutor
    return res.status(403).json({ error: "Somente instrutores podem acessar esta rota" });

  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(401).json({ error: "Token inválido" });
  }
}

export default authMiddleware;