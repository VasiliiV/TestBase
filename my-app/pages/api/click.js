import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export default async function click(req, res) {
    if (req.method === 'POST') {
      const { name, age } = req.body;
      const db = await open({
        filename: './sqlite/parsetags.db',
        driver: sqlite3.Database,
      });
      await db.run(`CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age TEXT)`);
      await db.run(`INSERT INTO tags (name, age) VALUES (?, ?)`, name, age);
        const lastRow = await db.get("SELECT name FROM tags ORDER BY id DESC LIMIT 1");
      await db.close();
        res.status(200).json({
        name: lastRow.name,
        age: age,
      });
    } else {
      res.status(404).json({ message: "Not found" });
      }
}