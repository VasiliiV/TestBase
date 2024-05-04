import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function login(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    const db = await open({
      filename: "./sqlite/parsetags.db",
      driver: sqlite3.Database,
    });

    try {
      // Проверяем, существует ли уже пользователь с таким именем
      const user = await db.get("SELECT * FROM user WHERE name = ?", name);
      //const user = await db.get("SELECT * FROM user WHERE name = '" + name + "'");


      if (user) {
        // Сравниваем предоставленный пароль с хешированным паролем в базе
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          // Пользователь существует и пароль верный, генерируем JWT
          const accessToken = jwt.sign(
            { name: user.name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
          );

          res.status(200).json({
            success: true,
            message: "Успешная авторизация",
            accessToken
          });
        } else {
          // Пароль не верный
          res.status(401).json({
            success: false,
            message: "Имя пользователя или пароль не верны"
          });
        }
      } else {
        // Пользователя нет, регистрируем нового пользователя

        // Хеширование пароля перед сохранением в базу данных
        const hashedPassword = await bcrypt.hash(password, 10);

        // Вставка нового пользователя в базу данных
        await db.run("INSERT INTO user (name, password) VALUES (?, ?)", name, hashedPassword);

        // Генерируем JWT для нового пользователя
        const accessToken = jwt.sign(
          { name: name },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );

        res.status(201).json({
          success: true,
          message: "Пользователь зарегистрирован и авторизован",
          accessToken
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Ошибка сервера"
      });
    } finally {
      await db.close();
    }
  }
}