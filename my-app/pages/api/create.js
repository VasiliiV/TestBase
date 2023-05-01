import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function create(req, res) {
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
      assignee
    } = req.body;
    
    const db = await open({
      filename: './sqlite/parsetags.db',
      driver: sqlite3.Database,
    });
    
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
    
    await db.close();
    
    res.status(200).json({
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
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
    }
}
