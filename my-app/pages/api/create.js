import authenticate from './authenticate.js';
import { openDb, ensureTables } from '../../lib/db';

export default async function create(req, res) {
  const allowedMethods = ['POST', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return authenticate(req, res, async () => {
    let db;
    try {
      db = await openDb();
      await ensureTables(db);

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
        const userName = req.user?.name;
        const createdAt = new Date().toISOString();

        await db.run(
          `INSERT INTO bags (
              project, issue_type, original_estimate, remaining_estimate, severity, priority,
              affects_versions, fix_versions, build, assignee, created_at, user_name
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
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
            createdAt,
            userName,
          ],
        );

        return res.status(200).json({
          message: 'Task created successfully',
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
            createdAt,
          },
        });
      }

      const userName = req.user?.name;
      await db.run(
        `DELETE FROM bags
         WHERE id = (SELECT id FROM bags WHERE user_name = $1 ORDER BY id DESC LIMIT 1)`,
        [userName]
      );
      return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    } finally {
      if (db) {
        await db.close();
      }
    }
  });
}
