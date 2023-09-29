import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function auth(req, res) {
    if (req.method === "POST") {
      const { name, password } = req.body;
      const db = await open({
        filename: "./sqlite/parsetags.db",
        driver: sqlite3.Database,
      });
      await db.run("INSERT INTO user (name, password) VALUES (?, ?)", name, password);
      await db.close();
      res.status(200).json({
        name: name,
        age: password,
      });
    }
  }