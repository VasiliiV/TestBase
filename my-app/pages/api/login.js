import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getJwtSecrets } from '../../lib/jwtSecrets';
import { ensureTables, openDb } from '../../lib/db';

export default async function login(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { accessTokenSecret } = getJwtSecrets();

  let db;
  try {
    const { name, password } = req.body;
    db = await openDb();
    await ensureTables(db);

    const user = await db.get('SELECT * FROM "user" WHERE name = $1', [name]);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          { name: user.name },
          accessTokenSecret,
          { expiresIn: '1h' }
        );

        return res.status(200).json({
          success: true,
          message: 'Login successful',
          accessToken,
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO "user" (name, password) VALUES ($1, $2)', [name, hashedPassword]);

    const accessToken = jwt.sign(
      { name },
      accessTokenSecret,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered and logged in',
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  } finally {
    if (db) {
      await db.close();
    }
  }
}
