import { test, expect } from '@playwright/test';
import { generateUser } from './auth.fixture';

test.describe('Auth API', () => {
  test('registers a new user and blocks duplicates', async ({ request }) => {
    const user = generateUser('register');

    const registerResponse = await request.post('/api/register', { data: user });
    expect(registerResponse.status()).toBe(200);
    const registerBody = await registerResponse.json();
    expect(registerBody.accessToken).toBeTruthy();
    expect(registerBody.refreshToken).toBeTruthy();

    const duplicateResponse = await request.post('/api/register', { data: user });
    expect(duplicateResponse.status()).toBe(409);
    const duplicateBody = await duplicateResponse.json();
    expect(duplicateBody.success).toBe(false);
  });

  test('login returns 401 for wrong password', async ({ request }) => {
    const user = generateUser('login');
    await request.post('/api/register', { data: user });

    const invalidLogin = await request.post('/api/login', {
      data: { ...user, password: 'wrong-pass' },
    });

    expect(invalidLogin.status()).toBe(401);
    const loginBody = await invalidLogin.json();
    expect(loginBody.message).toBe('Имя пользователя или пароль не верны');
  });

  test('login creates a new user when it does not exist', async ({ request }) => {
    const user = generateUser('auto-create');

    const loginResponse = await request.post('/api/login', { data: user });
    expect(loginResponse.status()).toBe(201);
    const loginBody = await loginResponse.json();
    expect(loginBody.accessToken).toBeTruthy();
  });
});

test.describe('Protected endpoints', () => {
  test('click endpoint rejects missing token', async ({ request }) => {
    const response = await request.get('/api/click');
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.message).toBe('Токен не предоставлен');
  });
});

test.describe('Public endpoints', () => {
  test('hello endpoint returns default payload', async ({ request }) => {
    const response = await request.get('/api/hello');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('John Doe');
  });
});
