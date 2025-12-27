import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getJwtSecrets } from '../../lib/jwtSecrets';

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
                    message: "A user with this name already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run("INSERT INTO user (name, password) VALUES (?, ?)", name, hashedPassword);

            const { accessTokenSecret, refreshTokenSecret } = getJwtSecrets();

            const accessToken = jwt.sign(
                { name: name },
                accessTokenSecret,
                { expiresIn: '15m' }
            );
            const refreshToken = jwt.sign(
                { name: name },
                refreshTokenSecret,
                { expiresIn: '7d' }
            );

            await db.close();

            return res.status(200).json({
                success: true,
                message: "Registration successful",
                accessToken,
                refreshToken
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }
}
