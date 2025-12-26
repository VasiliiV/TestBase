import { test, expect } from './auth.fixture';

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

test.describe('Protected API flows', () => {
  test('click endpoint supports create/read/delete cycle', async ({ request, token }) => {
    const payload = { name: 'Playwright User', age: "32" };

    const postResponse = await request.post('/api/click', {
      data: payload,
      headers: authHeaders(token),
    });
    expect(postResponse.status()).toBe(200);
    expect(await postResponse.json()).toMatchObject(payload);

    const getResponse = await request.get('/api/click', {
      headers: authHeaders(token),
    });
    expect(getResponse.status()).toBe(200);
    expect(await getResponse.json()).toMatchObject(payload);

    const deleteResponse = await request.delete('/api/click', {
      headers: authHeaders(token),
    });
    expect(deleteResponse.status()).toBe(200);
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toBe('Запись успешно удалена');
  });

  test('create endpoint validates methods and saves data', async ({ request, token }) => {
    const invalidResponse = await request.get('/api/create', {
      headers: authHeaders(token),
    });
    expect(invalidResponse.status()).toBe(405);

    const task = {
      project: 'PW',
      issueType: 'Bug',
      originalEstimate: '1d',
      remainingEstimate: '4h',
      severity: 'High',
      priority: 'P1',
      affectsVersions: '1.0.0',
      fixVersions: '1.0.1',
      build: '2024-01-01',
      assignee: 'qa',
    };

    const createResponse = await request.post('/api/create', {
      data: task,
      headers: authHeaders(token),
    });
    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    expect(createBody.message).toBe('Задача успешно создана');
    expect(createBody.data).toMatchObject(task);

    const cleanupResponse = await request.delete('/api/create', {
      headers: authHeaders(token),
    });
    expect(cleanupResponse.status()).toBe(200);
    const cleanupBody = await cleanupResponse.json();
    expect(cleanupBody.message).toBe('Запись успешно удалена');
  });
});
