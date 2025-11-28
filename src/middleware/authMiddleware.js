import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Decodifica o token e coloca no req.user

    if (!req.user.id) {
      console.log("ID do instrutor não encontrado no token");
      return res.status(401).json({ error: "Token não contém ID válido" });
    }

    console.log("Usuário autenticado:", req.user);

    if (req.user.role !== "INSTRUTOR") {
      return res.status(403).json({ error: "Somente instrutores podem acessar esta rota" });
    }
    
    next();
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    return res.status(401).json({ error: "Token inválido" });
  }
}

export default authMiddleware;