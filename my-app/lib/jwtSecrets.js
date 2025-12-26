import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const cache = {
  loaded: false,
  accessTokenSecret: null,
  refreshTokenSecret: null,
};

function readSecretsFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeSecretsFile(filePath, accessTokenSecret, refreshTokenSecret) {
  const payload = {
    ACCESS_TOKEN_SECRET: accessTokenSecret,
    REFRESH_TOKEN_SECRET: refreshTokenSecret,
  };
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), { mode: 0o600 });
}

function ensureSecrets() {
  if (cache.loaded) {
    return;
  }

  const accessEnv = process.env.ACCESS_TOKEN_SECRET;
  const refreshEnv = process.env.REFRESH_TOKEN_SECRET;
  const filePath = path.join(process.cwd(), '.local-secrets.json');
  const fileSecrets = readSecretsFile(filePath);

  let accessTokenSecret = accessEnv || (fileSecrets && fileSecrets.ACCESS_TOKEN_SECRET);
  let refreshTokenSecret = refreshEnv || (fileSecrets && fileSecrets.REFRESH_TOKEN_SECRET);
  let shouldPersist = false;

  if (!accessTokenSecret) {
    accessTokenSecret = crypto.randomBytes(64).toString('hex');
    shouldPersist = true;
  }

  if (!refreshTokenSecret) {
    refreshTokenSecret = crypto.randomBytes(64).toString('hex');
    shouldPersist = true;
  }

  if ((!accessEnv || !refreshEnv) && shouldPersist) {
    writeSecretsFile(filePath, accessTokenSecret, refreshTokenSecret);
  }

  cache.loaded = true;
  cache.accessTokenSecret = accessTokenSecret;
  cache.refreshTokenSecret = refreshTokenSecret;
}

export function getJwtSecrets() {
  ensureSecrets();
  return {
    accessTokenSecret: cache.accessTokenSecret,
    refreshTokenSecret: cache.refreshTokenSecret,
  };
}
