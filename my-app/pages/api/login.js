import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function login(req, res) {
    if (req.method === "POST") {
        const { name, password } = req.body;
        const db = await open({
            filename: "./sqlite/parsetags.db",
            driver: sqlite3.Database,
        });

        const user = await db.get("SELECT * FROM user WHERE name = ? AND password = ?", name, password);
        await db.close();

        if (user) {
            res.status(200).json({
                success: true,
                message: "Успешная авторизация"
            });
        } else {
            res.status(401).json({ 
                success: false,
                message: "Имя пользователя или пароль не верны"
            });
        }
    }
}
