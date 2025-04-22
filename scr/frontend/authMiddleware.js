const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sua-chave-secreta-aqui';

// Middleware para verificar o token e os privilégios
function verifyToken(roleRequired) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    if (!token) {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      // Verifica o privilégio
      if (roleRequired && decoded.role !== roleRequired) {
        return res.status(403).json({ message: 'Permissão insuficiente' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido' });
    }
  };
}

module.exports = verifyToken;