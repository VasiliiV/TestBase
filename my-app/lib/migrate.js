const { openDb, ensureTables } = require('./db');

async function runMigrations() {
  const db = await openDb();
  try {
    await ensureTables(db);
  } finally {
    db.close();
  }
}

module.exports = { runMigrations };
