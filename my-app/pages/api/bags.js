import authenticate from './authenticate.js';
import { openDb, ensureTables } from '../../lib/db';

export default async function bags(req, res) {
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
          `SELECT id, summary, issue_type, severity, priority, created_at
           FROM bags
           WHERE user_name = ?
           ORDER BY id DESC`,
          userName
        );
        return res.status(200).json({ data: rows });
      }

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
          component,
          summary,
          description,
          stepsToReproduce,
          attachment,
          labels,
          client,
          linkedIssues,
          issue,
          qa,
          environment,
          epicLink,
          plannedStart,
          plannedFinish,
          customerContacts,
          sprint,
        } = req.body || {};

        const createdAt = new Date().toISOString();
        const result = await db.run(
          `INSERT INTO bags (
            project, issue_type, original_estimate, remaining_estimate, severity, priority,
            affects_versions, fix_versions, build, assignee, component, summary, description,
            steps_to_reproduce, attachment, labels, client, linked_issues, issue, qa, environment,
            epic_link, planned_start, planned_finish, customer_contacts, sprint, created_at, user_name
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            project || null,
            issueType || null,
            originalEstimate || null,
            remainingEstimate || null,
            severity || null,
            priority || null,
            affectsVersions || null,
            fixVersions || null,
            build || null,
            assignee || null,
            component || null,
            summary || null,
            description || null,
            stepsToReproduce || null,
            attachment || null,
            labels || null,
            client || null,
            linkedIssues || null,
            issue || null,
            qa || null,
            environment || null,
            epicLink || null,
            plannedStart || null,
            plannedFinish || null,
            customerContacts || null,
            sprint || null,
            createdAt,
            userName,
          ]
        );

        return res.status(201).json({
          message: 'Bug report created',
          data: {
            id: result.lastID,
            summary: summary || 'Untitled',
            issue_type: issueType || 'Bug',
            severity: severity || 'Medium',
            priority: priority || 'Medium',
            created_at: createdAt,
          },
        });
      }

      const id = req.body?.id ?? req.query?.id;
      if (!id) {
        return res.status(400).json({ message: 'Identifier is required' });
      }

      const result = await db.run(
        'DELETE FROM bags WHERE id = ? AND user_name = ?',
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
