const { Pool } = require('pg');

const buildConnectionConfig = () => {
  const directUrl =
    process.env.DATABASE_URL ||
    process.env.DATABASE_PUBLIC_URL ||
    process.env.POSTGRES_URL ||
    process.env.PGURL;

  if (directUrl) {
    return { connectionString: directUrl };
  }

  const pg = {
    host:
      process.env.PGHOST ||
      process.env.POSTGRES_HOST ||
      process.env.RAILWAY_PRIVATE_DOMAIN ||
      process.env.RAILWAY_TCP_PROXY_DOMAIN,
    port: process.env.PGPORT || process.env.POSTGRES_PORT || process.env.RAILWAY_TCP_PROXY_PORT || '5432',
    user: process.env.PGUSER || process.env.POSTGRES_USER,
    password: process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD,
    database: process.env.PGDATABASE || process.env.POSTGRES_DB,
  };

  if (pg.host && pg.user && pg.password && pg.database) {
    const encodedPassword = encodeURIComponent(pg.password);
    const encodedUser = encodeURIComponent(pg.user);
    return {
      connectionString: `postgresql://${encodedUser}:${encodedPassword}@${pg.host}:${pg.port}/${pg.database}`,
    };
  }

  return {
    missing: {
      host: pg.host,
      port: pg.port,
      user: pg.user,
      database: pg.database,
    },
  };
};

const ssl =
  process.env.PGSSLMODE === 'disable'
    ? false
    : { rejectUnauthorized: false };

let pool = null;

const buildMissingEnvMessage = (missing) => {
  const details = [
    `host=${missing.host ?? 'not set'}`,
    `port=${missing.port ?? 'not set'}`,
    `user=${missing.user ?? 'not set'}`,
    `database=${missing.database ?? 'not set'}`,
  ].join(', ');

  return [
    'Database connection is not configured.',
    'Set DATABASE_URL (or DATABASE_PUBLIC_URL / POSTGRES_URL / PGURL) or PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE (or POSTGRES_*) environment variables.',
    `Current values: ${details}`,
  ].join(' ');
};

const getPool = () => {
  if (pool) return pool;

  const config = buildConnectionConfig();

  if (!config.connectionString) {
    throw new Error(buildMissingEnvMessage(config.missing || {}));
  }

  pool = new Pool({
    ...config,
    ssl: process.env.NODE_ENV === 'production' ? ssl : undefined,
  });

  return pool;
};

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
    getPool();
  }
};

let ensurePromise = null;

const ensureSchema = async () => {
  const client = await getPool().connect();
  try {
    await ensureTables(client);
  } finally {
    client.release();
  }
};

const openDb = async () => {
  assertPool();
  if (!ensurePromise) {
    ensurePromise = ensureSchema().catch((error) => {
      // Reset so a transient connection issue can be retried on the next call
      ensurePromise = null;
      throw error;
    });
  }

  const client = await getPool().connect();
  await ensurePromise;
  return wrapClient(client);
};

module.exports = { openDb, ensureTables, getPool };
