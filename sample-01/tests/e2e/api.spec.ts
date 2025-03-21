import { test, expect } from '@playwright/test';

// Only test the API endpoints to avoid UI issues
test.describe('API Testing', () => {
  test('protected API endpoint returns 401 when not authenticated', async ({ request }) => {
    const response = await request.get('/api/protected');
    expect(response.status()).toBe(401);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('error', 'Authentication required');
  });

  test('auth token endpoint returns 401 when not authenticated', async ({ request }) => {
    const response = await request.get('/api/auth/token');
    expect(response.status()).toBe(401);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('error', 'Unauthorized');
  });

  test('auth roles endpoint returns 401 when not authenticated', async ({ request }) => {
    const response = await request.get('/api/auth/roles');
    expect(response.status()).toBe(401);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('error', 'Authentication required');
  });
}); 