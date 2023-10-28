import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function register(req, res) {
    if (req.method === "POST") {
        const { name, password } = req.body;
        const db = await open({
            filename: "./sqlite/parsetags.db",
            driver: sqlite3.Database,
        });

        const existingUser = await db.get("SELECT * FROM user WHERE name = ?", name);

        if (existingUser) {
            res.status(409).json({ 
                success: false,
                message: "Пользователь с таким именем уже существует"
            });
        } else {
            await db.run("INSERT INTO user (name, password) VALUES (?, ?)", name, password);
            await db.close();
            res.status(200).json({
                success: true,
                message: "Успешная регистрация"
            });
        }
    }
}
