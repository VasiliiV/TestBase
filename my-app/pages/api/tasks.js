import authenticate from './authenticate.js';
import { openDb, ensureTables } from '../../lib/db';

export default async function tasks(req, res) {
  const allowedMethods = ['GET', 'POST', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  return authenticate(req, res, async () => {
    let db;
    try {
      db = await openDb();
      await ensureTables(db);

      const userName = req.user?.name;
      if (!userName) {
        return res.status(401).json({ message: 'User not found' });
      }

      if (req.method === 'GET') {
        const rows = await db.all(
          `SELECT id, title, description, tags, created_at
           FROM task
           WHERE user_name = $1
           ORDER BY id DESC`,
          [userName]
        );
        return res.status(200).json({ data: rows });
      }

      if (req.method === 'POST') {
        const {
          title,
          description,
          scenario,
          comments,
          tags,
          issuesLinks,
          testKeys,
          members,
          fields,
          relations,
          mutes,
        } = req.body || {};

        const createdAt = new Date().toISOString();
        const result = await db.run(
          `INSERT INTO task (
            title, description, scenario, comments, tags, issues_links, test_keys,
            members, fields, relations, mutes, created_at, user_name
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
          [
            title || null,
            description || null,
            scenario || null,
            comments || null,
            tags || null,
            issuesLinks || null,
            testKeys || null,
            members || null,
            fields || null,
            relations || null,
            mutes || null,
            createdAt,
            userName,
          ]
        );

        const insertedId = result.lastID ?? result.rows?.[0]?.id ?? null;

        return res.status(201).json({
          message: 'Test case created',
          data: {
            id: insertedId,
            title: title || 'Untitled',
            description: description || null,
            tags: tags || null,
            created_at: createdAt,
          },
        });
      }

      const id = req.body?.id ?? req.query?.id;
      if (!id) {
        return res.status(400).json({ message: 'Identifier is required' });
      }

      const result = await db.run(
        'DELETE FROM task WHERE id = $1 AND user_name = $2',
        [id, userName]
      );
      return res.status(200).json({ message: 'Record deleted', changes: result.changes });
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
