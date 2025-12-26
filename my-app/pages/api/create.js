import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import authenticate from './authenticate.js';

export default async function create(req, res) {
  const allowedMethods = ['POST', 'DELETE'];
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
          assignee,
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
            assignee,
          ],
        );

        return res.status(200).json({
          message: 'Задача успешно создана',
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
            assignee,
          },
        });
      }

      await db.run('DELETE FROM create_task WHERE id = (SELECT MAX(id) FROM create_task)');
      return res.status(200).json({ message: 'Запись успешно удалена' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка сервера' });
    } finally {
      if (db) {
        await db.close();
      }
    }
  });
}
