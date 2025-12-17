import { test, expect } from './auth.fixture';


test('click', async ({ request, token }) => {
  const response = await request.get('/api/click', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  expect(response.status()).toBe(200);
});