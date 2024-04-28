import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authenticate from './authenticate.js';

export default async function create(req, res) {
  // Подключение к базе данных
  const db = await open({
    filename: './sqlite/parsetags.db',
    driver: sqlite3.Database,
  });

  // Проверяем аутентификацию для POST и DELETE запросов
  if (['POST', 'DELETE'].includes(req.method)) {
    // authenticate принимает функцию, которая будет выполнена после успешной аутентификации
    return authenticate(req, res, async () => {
      try {
        if (req.method === 'POST') {
          // Здесь обрабатываем POST-запрос
          const {
            project,
            issueType,
            originalEstimate,
            remainingEstimate,
            severity,
            priority,
            affectsVersions,
            fixVersions,
            build,
            assignee
          } = req.body;
          
          await db.run(
            `INSERT INTO create_task (
              project, issue_type, original_estimate, remaining_estimate, severity, priority,
              affects_versions, fix_versions, build, assignee
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              project,
              issueType,
              originalEstimate,
              remainingEstimate,
              severity,
              priority,
              affectsVersions,
              fixVersions,
              build,
              assignee
            ]
          );
          
          res.status(200).json({
            message: "Задача успешно создана",
            data: {
              project,
              issueType,
              originalEstimate,
              remainingEstimate,
              severity,
              priority,
              affectsVersions,
              fixVersions,
              build,
              assignee
            }
          });
        } else if (req.method === 'DELETE') {
          // Здесь обрабатываем DELETE-запрос
          await db.run("DELETE FROM create_task WHERE id = (SELECT MAX(id) FROM create_task)");
          res.status(200).json({ message: "Запись успешно удалена" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
      } finally {
        await db.close(); // Важно закрыть соединение с базой данных
      }
    });
  } else {
    await db.close();
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}