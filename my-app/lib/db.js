import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.PGURL;

const ssl =
  process.env.PGSSLMODE === 'disable'
    ? false
    : { rejectUnauthorized: false };

const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? ssl : undefined,
    })
  : null;

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
  created_at: 'TIMESTAMPTZ',
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
  created_at: 'TIMESTAMPTZ',
  user_name: 'TEXT',
};

const USER_COLUMNS = {
  name: 'TEXT',
  password: 'TEXT',
  created_at: 'TIMESTAMPTZ DEFAULT NOW()',
};

const TAG_COLUMNS = {
  name: 'TEXT',
  age: 'INTEGER',
  created_at: 'TIMESTAMPTZ DEFAULT NOW()',
};

const wrapClient = (client) => ({
  query: (text, params = []) => client.query(text, params),
  all: async (text, params = []) => (await client.query(text, params)).rows,
  get: async (text, params = []) => (await client.query(text, params)).rows[0],
  run: async (text, params = []) => {
    const result = await client.query(text, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount,
      changes: result.rowCount,
      lastID: result.rows?.[0]?.id ?? null,
    };
  },
  close: () => client.release(),
});

const ensureTable = async (client, tableName, columns) => {
  await client.query(`CREATE TABLE IF NOT EXISTS ${tableName} (id SERIAL PRIMARY KEY)`);

  for (const [name, type] of Object.entries(columns)) {
    await client.query(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${name} ${type}`);
  }
};

const ensureUserIndexes = async (client) => {
  await client.query('CREATE UNIQUE INDEX IF NOT EXISTS user_name_unique ON "user" (name)');
};

const ensureTables = async (db) => {
  await ensureTable(db, '"user"', USER_COLUMNS);
  await ensureUserIndexes(db);
  await ensureTable(db, 'task', TASK_COLUMNS);
  await ensureTable(db, 'bags', BAGS_COLUMNS);
  await ensureTable(db, 'tags', TAG_COLUMNS);
};

const assertPool = () => {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured for PostgreSQL connection');
  }
};

export const openDb = async () => {
  assertPool();
  const client = await pool.connect();
  return wrapClient(client);
};

export { ensureTables };
