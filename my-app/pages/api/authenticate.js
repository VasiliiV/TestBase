import jwt from 'jsonwebtoken';
import { getJwtSecrets } from '../../lib/jwtSecrets';

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const { accessTokenSecret } = getJwtSecrets();

  if (token == null) {
    return res.status(401).json({ message: 'Токен не предоставлен' });
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Токен недействителен или истек' });
    }
    req.user = user;
    next();
  });
}
