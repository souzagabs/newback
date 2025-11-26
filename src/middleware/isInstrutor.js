export function isInstrutor(req, res, next) {
  if (req.user.role !== "INSTRUTOR") {
    return res.status(403).json({ error: "Acesso negado: não é instrutor" });
  }
  next();
}
