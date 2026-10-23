import { test, expect } from '@playwright/test';

test.describe('Posts API', () => {
  test('GET /posts returns a list', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('GET /posts/1 returns the expected shape', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toMatchObject({
      id: 1,
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('GET /posts/99999 returns 404', async ({ request }) => {
    const response = await request.get('/posts/99999');
    expect(response.status()).toBe(404);
  });

  test('POST /posts creates a resource', async ({ request }) => {
    const payload = { title: 'QA automation', body: 'Playwright API test', userId: 1 };
    const response = await request.post('/posts', { data: payload });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toBeDefined();
  });

  test('PUT /posts/1 updates a resource', async ({ request }) => {
    const payload = { id: 1, title: 'Updated', body: 'Updated body', userId: 1 };
    const response = await request.put('/posts/1', { data: payload });
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject(payload);
  });

  test('DELETE /posts/1 succeeds', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  });
});
