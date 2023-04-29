import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export default async function click(req, res) {
  if (req.method === "POST") {
    const { name, age } = req.body;
    const db = await open({
      filename: "./sqlite/parsetags.db",
      driver: sqlite3.Database,
    });
    await db.run("INSERT INTO tags (name, age) VALUES (?, ?)", name, age);
    await db.close();
    res.status(200).json({
      name: name,
      age: age,
    });
  } else if (req.method === "GET") {
    const db = await open({
      filename: "./sqlite/parsetags.db",
      driver: sqlite3.Database,
    });
    const lastRow = await db.get(
      "SELECT name, age FROM tags ORDER BY id DESC LIMIT 1"
    );
    await db.close();
    res.status(200).json({
      name: lastRow.name,
      age: lastRow.age,
    });
  } else if (req.method === "DELETE") {
    const db = await open({
      filename: "./sqlite/parsetags.db",
      driver: sqlite3.Database,
    });
    await db.run(
      "DELETE FROM tags WHERE id = (SELECT MAX(id) FROM tags)"
    );
    await db.close();
    res.status(200).json({
      message: "Запись успешно удалена",
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
}