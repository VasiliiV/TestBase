import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authenticate from './authenticate.js'; 

export default function click(req, res) {
  // Промежуточная функция для аутентификации
  const authMiddleware = async (next) => {
    return authenticate(req, res, next);
  };

  if (req.method === "POST" || req.method === "DELETE") {
    authMiddleware(async () => {
      const db = await open({
        filename: "./sqlite/parsetags.db",
        driver: sqlite3.Database,
      });
      try {
        if (req.method === "POST") {
          const { name, age } = req.body;
          await db.run("INSERT INTO tags (name, age) VALUES (?, ?)", name, age);
          res.status(200).json({ name, age });
        } else if (req.method === "DELETE") {
          await db.run("DELETE FROM tags WHERE id = (SELECT MAX(id) FROM tags)");
          res.status(200).json({ message: "Запись успешно удалена" });
        }
      } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
      } finally {
        await db.close();
      }
    });
  } else if (req.method === "GET") {
    // Добавляем аутентификацию, если требуется
    authMiddleware(async () => {
      const db = await open({
        filename: "./sqlite/parsetags.db",
        driver: sqlite3.Database,
      });
      try {
        const lastRow = await db.get("SELECT name, age FROM tags ORDER BY id DESC LIMIT 1");
        res.status(200).json(lastRow);
      } catch (err) {
        res.status(500).json({ message: "Ошибка сервера" });
      } finally {
        await db.close();
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}