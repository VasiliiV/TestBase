import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authenticate from './authenticate.js';

export default async function click(req, res) {
  if (["POST", "DELETE"].includes(req.method)) {
    // Для POST и DELETE запросов сначала вызываем функцию аутентификации
    return authenticate(req, res, async () => {
      const db = await open({
        filename: "./sqlite/parsetags.db",
        driver: sqlite3.Database,
      });
      try {
        if (req.method === "POST") {
          const { name, age } = req.body;
          await db.run("INSERT INTO tags (name, age) VALUES (?, ?)", name, age);
          res.status(200).json({ name, age });
        } else {
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
    // GET запрос не требует аутентификации
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
  } else {
    // Если метод не поддерживается
    res.status(405).json({ message: "Method Not Allowed" });
  }
}