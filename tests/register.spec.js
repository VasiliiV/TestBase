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

  test('tasks endpoint supports create/read/delete cycle', async ({ request, token }) => {
    const task = {
      title: 'PW test case',
      description: 'Smoke test for tasks endpoint',
      tags: 'api,playwright',
      scenario: 'Open form, submit, verify',
      comments: 'No blockers',
      issuesLinks: 'TB-1',
      testKeys: 'TC-101',
      members: 'qa',
      fields: 'priority',
      relations: 'none',
      mutes: 'false',
    };

    const createResponse = await request.post('/api/tasks', {
      data: task,
      headers: authHeaders(token),
    });
    expect(createResponse.status()).toBe(201);
    const createBody = await createResponse.json();
    expect(createBody.data).toMatchObject({
      title: task.title,
      tags: task.tags,
    });

    const getResponse = await request.get('/api/tasks', {
      headers: authHeaders(token),
    });
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody.data.some((item) => item.id === createBody.data.id)).toBe(true);

    const deleteResponse = await request.delete(`/api/tasks?id=${createBody.data.id}`, {
      headers: authHeaders(token),
    });
    expect(deleteResponse.status()).toBe(200);
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toBe('Запись удалена');
  });

  test('bags endpoint supports create/read/delete cycle', async ({ request, token }) => {
    const bag = {
      project: 'PW',
      issueType: 'Bug',
      originalEstimate: '2d',
      remainingEstimate: '1d',
      severity: 'High',
      priority: 'P1',
      affectsVersions: '1.0.0',
      fixVersions: '1.0.1',
      build: '2024-02-01',
      assignee: 'qa',
      component: 'api',
      summary: 'API regression',
      description: 'Response schema mismatch',
      stepsToReproduce: '1) Call endpoint 2) Check payload',
      attachment: '',
      labels: 'api',
      client: 'demo',
      linkedIssues: 'TB-2',
      issue: 'TB-2',
      qa: 'junior',
      environment: 'local',
      epicLink: 'EP-1',
      plannedStart: '2024-02-02',
      plannedFinish: '2024-02-03',
      customerContacts: 'qa@demo.local',
      sprint: 'Sprint 1',
    };

    const createResponse = await request.post('/api/bags', {
      data: bag,
      headers: authHeaders(token),
    });
    expect(createResponse.status()).toBe(201);
    const createBody = await createResponse.json();
    expect(createBody.data).toMatchObject({
      summary: bag.summary,
      issue_type: bag.issueType,
    });

    const getResponse = await request.get('/api/bags', {
      headers: authHeaders(token),
    });
    expect(getResponse.status()).toBe(200);
    const getBody = await getResponse.json();
    expect(getBody.data.some((item) => item.id === createBody.data.id)).toBe(true);

    const deleteResponse = await request.delete(`/api/bags?id=${createBody.data.id}`, {
      headers: authHeaders(token),
    });
    expect(deleteResponse.status()).toBe(200);
    const deleteBody = await deleteResponse.json();
    expect(deleteBody.message).toBe('Запись удалена');
  });
});
