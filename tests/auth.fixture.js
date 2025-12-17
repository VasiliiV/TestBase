import { test as base, expect } from '@playwright/test';

function generateUser() {
  const id = Date.now();
  return {
    name: `user_${id}`,
    password: '123456',
  };
}

export const test = base.extend({
  token: async ({ request }, use) => {
    const user = generateUser();
    console.log('🧪 Created test user:', user);

    // 1️⃣ Первая регистрация — OK
    const registerResponse = await request.post('/api/register', {
      data: user,
    });
    expect(registerResponse.status()).toBe(200);

    // 2️⃣ Повторная регистрация — 409
    const duplicateRegisterResponse = await request.post('/api/register', {
      data: user,
    });

    expect(duplicateRegisterResponse.status()).toBe(409);

    const duplicateBody = await duplicateRegisterResponse.json();
    expect(duplicateBody.success).toBe(false);
    expect(duplicateBody.message)
      .toBe('Пользователь с таким именем уже существует');

    // 3️⃣ Логин под этим же пользователем
    const loginResponse = await request.post('/api/login', {
      data: user,
    });
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    expect(loginBody.accessToken).toBeDefined();

    // 4️⃣ Отдаём токен тестам
    await use(loginBody.accessToken);
  },
});

export { expect };