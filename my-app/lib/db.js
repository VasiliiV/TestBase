import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DB_PATH = './sqlite/parsetags.db';

const TASK_COLUMNS = {
  title: 'TEXT',
  description: 'TEXT',
  scenario: 'TEXT',
  comments: 'TEXT',
  tags: 'TEXT',
  issues_links: 'TEXT',
  test_keys: 'TEXT',
  members: 'TEXT',
  fields: 'TEXT',
  relations: 'TEXT',
  mutes: 'TEXT',
  created_at: 'TEXT',
  user_name: 'TEXT',
};

const BAGS_COLUMNS = {
  project: 'TEXT',
  issue_type: 'TEXT',
  original_estimate: 'TEXT',
  remaining_estimate: 'TEXT',
  severity: 'TEXT',
  priority: 'TEXT',
  affects_versions: 'TEXT',
  fix_versions: 'TEXT',
  build: 'TEXT',
  assignee: 'TEXT',
  component: 'TEXT',
  summary: 'TEXT',
  description: 'TEXT',
  steps_to_reproduce: 'TEXT',
  attachment: 'TEXT',
  labels: 'TEXT',
  client: 'TEXT',
  linked_issues: 'TEXT',
  issue: 'TEXT',
  qa: 'TEXT',
  environment: 'TEXT',
  epic_link: 'TEXT',
  planned_start: 'TEXT',
  planned_finish: 'TEXT',
  customer_contacts: 'TEXT',
  sprint: 'TEXT',
  created_at: 'TEXT',
  user_name: 'TEXT',
};

const normalizeColumns = (columns) => Object.keys(columns);

const getExistingColumns = async (db, tableName) => {
  const rows = await db.all(`PRAGMA table_info(${tableName});`);
  return rows.map((row) => row.name);
};

const addMissingColumns = async (db, tableName, columns) => {
  const existing = await getExistingColumns(db, tableName);
  for (const [name, type] of Object.entries(columns)) {
    if (!existing.includes(name)) {
      await db.run(`ALTER TABLE ${tableName} ADD COLUMN ${name} ${type};`);
    }
  }
};

const LEGACY_TASK_COLUMNS = [
  'project',
  'issue_type',
  'original_estimate',
  'remaining_estimate',
  'severity',
  'priority',
  'affects_versions',
  'fix_versions',
  'build',
  'assignee',
];

const isLegacyTaskTable = (columns) =>
  LEGACY_TASK_COLUMNS.some((column) => columns.includes(column));

const migrateLegacyTaskToBags = async (db) => {
  await db.run(
    `INSERT INTO bags (
      project, issue_type, original_estimate, remaining_estimate, severity, priority,
      affects_versions, fix_versions, build, assignee, created_at, user_name
    )
    SELECT project, issue_type, original_estimate, remaining_estimate, severity, priority,
      affects_versions, fix_versions, build, assignee, NULL, 'legacy'
    FROM task;`
  );
};

const rebuildTaskTable = async (db) => {
  await db.run(
    `CREATE TABLE IF NOT EXISTS task_new (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    );`
  );
  await addMissingColumns(db, 'task_new', TASK_COLUMNS);
  await db.run('DROP TABLE task;');
  await db.run('ALTER TABLE task_new RENAME TO task;');
};

const ensureTaskTable = async (db) => {
  const createTaskExists = await db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='create_task';"
  );
  const taskExists = await db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='task';"
  );

  if (createTaskExists && !taskExists) {
    await db.run('ALTER TABLE create_task RENAME TO task;');
  }

  await db.run(
    `CREATE TABLE IF NOT EXISTS task (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    );`
  );

  const columns = await getExistingColumns(db, 'task');
  if (isLegacyTaskTable(columns)) {
    await migrateLegacyTaskToBags(db);
    await rebuildTaskTable(db);
  } else {
    await addMissingColumns(db, 'task', TASK_COLUMNS);
  }
};

const ensureBagsTable = async (db) => {
  await db.run(
    `CREATE TABLE IF NOT EXISTS bags (
      id INTEGER PRIMARY KEY AUTOINCREMENT
    );`
  );

  await addMissingColumns(db, 'bags', BAGS_COLUMNS);
};

export const openDb = async () =>
  open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

export const ensureTables = async (db) => {
  await ensureBagsTable(db);
  await ensureTaskTable(db);
};

export const taskColumns = normalizeColumns(TASK_COLUMNS);
export const bagsColumns = normalizeColumns(BAGS_COLUMNS);
