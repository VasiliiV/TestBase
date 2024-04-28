import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function register(req, res) {
    if (req.method === "POST") {
        try {
            const { name, password } = req.body;
            const db = await open({
                filename: "./sqlite/parsetags.db",
                driver: sqlite3.Database,
            });

            const existingUser = await db.get("SELECT * FROM user WHERE name = ?", name);

            if (existingUser) {
                await db.close();
                return res.status(409).json({
                    success: false,
                    message: "Пользователь с таким именем уже существует"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run("INSERT INTO user (name, password) VALUES (?, ?)", name, hashedPassword);

            // Проверяем наличие переменных окружения
            if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
                throw new Error("Необходимые переменные окружения отсутствуют");
            }

            // Создание токенов
            const accessToken = jwt.sign(
                { name: name },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            const refreshToken = jwt.sign(
                { name: name },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '7d' }
            );

            await db.close();

            return res.status(200).json({
                success: true,
                message: "Успешная регистрация",
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Произошла внутренняя ошибка сервера"
            });
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Метод не поддерживается"
        });
    }
}