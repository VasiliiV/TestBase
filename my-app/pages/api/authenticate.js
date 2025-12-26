import jwt from 'jsonwebtoken';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(500).json({ message: 'Токен не может быть проверен: отсутствует секрет' });
  }

  if (token == null) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Токен недействителен или истек' });
    }
    req.user = user;
    next();
  });
}
