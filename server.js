const http = require('http');

const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 8080;

const notes = [];

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,PUT,PATCH,GET,OPTIONS,DELETE');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const contentType = req.headers['content-type'] || '';
    let payload = body;

    if (contentType.includes('application/json') && body) {
      try {
        payload = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid JSON payload' }));
        return;
      }
    }

    if (req.method === 'POST') {
      notes.push(payload);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Saved', data: payload }));
      return;
    }

    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(notes));
      return;
    }

    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

// Ensure graceful shutdown so orchestrators that send SIGTERM don't leave npm reporting errors
const shutdown = signal => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(err => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    }
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
