const { spawn } = require('child_process');
const path = require('path');
const { runMigrations } = require('./lib/migrate');

const NEXT_BIN = require.resolve('next/dist/bin/next');

async function start() {
  await runMigrations();
  console.log('Database migrations completed');

  const port = process.env.PORT || '3000';
  const nextProcess = spawn('node', [NEXT_BIN, 'start', '-H', '0.0.0.0', '-p', port], {
    stdio: 'inherit',
    env: process.env,
    cwd: path.resolve(__dirname),
  });

  nextProcess.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }
    process.exit(code ?? 0);
  });

  nextProcess.on('error', (error) => {
    console.error('Failed to start Next.js:', error);
    process.exit(1);
  });
}

start().catch((error) => {
  console.error('Failed to run database migrations:', error);
  process.exit(1);
});
