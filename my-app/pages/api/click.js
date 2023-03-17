import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function click(req, res) {
    if (req.method === 'POST') {
      const { name, age } = req.body;
      const apiResponse = await fetch('http://127.0.0.1:80/api', {
        method: 'POST',
        body: JSON.stringify({ name, age }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const text = await apiResponse.json();
      const db = await open({
        filename: './sqlite/parsetags.db',
        driver: sqlite3.Database,
      });
      await db.run(`CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age TEXT)`);
      await db.run(`INSERT INTO tags (text) VALUES (?, ?)`, JSON.stringify(text));
      await db.close();
      res.status(200).json({ data: 'Success' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }