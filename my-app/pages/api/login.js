import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function login(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Метод не поддерживается' });
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(500).json({ success: false, message: 'Отсутствует секрет для выдачи токена' });
  }

  let db;
  try {
    const { name, password } = req.body;
    db = await open({
      filename: './sqlite/parsetags.db',
      driver: sqlite3.Database,
    });

    const user = await db.get('SELECT * FROM user WHERE name = ?', name);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const accessToken = jwt.sign(
          { name: user.name },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );

        return res.status(200).json({
          success: true,
          message: 'Успешная авторизация',
          accessToken,
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Имя пользователя или пароль не верны',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO user (name, password) VALUES (?, ?)', name, hashedPassword);

    const accessToken = jwt.sign(
      { name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(201).json({
      success: true,
      message: 'Пользователь зарегистрирован и авторизован',
      accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка сервера',
    });
  } finally {
    if (db) {
      await db.close();
    }
  }
}
