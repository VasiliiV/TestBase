import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authenticate from './authenticate.js';

export default function click(req, res) {
  const allowedMethods = ['GET', 'POST', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return authenticate(req, res, async () => {
    let db;
    try {
      db = await open({
        filename: './sqlite/parsetags.db',
        driver: sqlite3.Database,
      });

      if (req.method === 'POST') {
        const { name, age } = req.body;
        await db.run('INSERT INTO tags (name, age) VALUES (?, ?)', [name, age]);
        return res.status(200).json({ name, age });
      }

      if (req.method === 'DELETE') {
        await db.run('DELETE FROM tags WHERE id = (SELECT MAX(id) FROM tags)');
        return res.status(200).json({ message: 'Record deleted successfully' });
      }

      const lastRow = await db.get('SELECT name, age FROM tags ORDER BY id DESC LIMIT 1');
      if (!lastRow) {
        return res.status(200).json({ name: null, age: null });
      }
      return res.status(200).json(lastRow);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    } finally {
      if (db) {
        await db.close();
      }
    }
  });
}
