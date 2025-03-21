import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('homepage loads and contains expected content', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page.locator('h1').first()).toContainText('Next.js Auth0 Sample');
    
    // Check login button in navbar specifically
    const navbarLoginButton = page.locator('header nav a').filter({ hasText: 'Login' });
    await expect(navbarLoginButton).toBeVisible();
    await expect(navbarLoginButton).toHaveAttribute('href', '/auth/login');
  });
  
  test('API demo page loads correctly', async ({ page }) => {
    await page.goto('/api-demo');
    
    // Check page header
    await expect(page.locator('h1').first()).toContainText('API Integration Demo');
    
    // Check API demo component is rendered (using first to be specific)
    await expect(page.getByRole('heading', { name: 'API Demo', exact: true }).first()).toBeVisible();
    
    // Check buttons
    await expect(page.getByRole('button', { name: 'Call Protected API' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Get Access Token' }).first()).toBeVisible();
  });
  
  test('RBAC demo page loads correctly', async ({ page }) => {
    await page.goto('/rbac-demo');
    
    // Check page header
    await expect(page.locator('h1').first()).toContainText('Role-Based Access Control');
    
    // Look for text about authentication (more flexible matching)
    await expect(page.getByText(/must be logged in/i, { exact: false })).toBeVisible();
    
    // Check for login link within the authentication note
    // Find the authentication note first, then find the login link within it
    const authNote = page.getByText(/must be logged in/i, { exact: false });
    await expect(authNote).toBeVisible();
    
    // Make sure there's a login link somewhere on the page
    const anyLoginLink = page.getByRole('link').filter({ hasText: /log.?in/i }).first();
    await expect(anyLoginLink).toBeVisible();
    await expect(anyLoginLink).toHaveAttribute('href', '/auth/login');
  });
  
  test('navigation works through navbar', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to API Demo (select the link in the navbar)
    const apiDemoLink = page.locator('header a').filter({ hasText: 'API Demo' });
    await apiDemoLink.click();
    await expect(page).toHaveURL('/api-demo');
    await expect(page.locator('h1').first()).toContainText('API Integration Demo');
    
    // Navigate to RBAC Demo (select the link in the navbar)
    const rbacDemoLink = page.locator('header a').filter({ hasText: 'RBAC Demo' });
    await rbacDemoLink.click();
    await expect(page).toHaveURL('/rbac-demo');
    await expect(page.locator('h1').first()).toContainText('Role-Based Access Control');
    
    // Navigate back to Home (select the link in the navbar)
    const homeLink = page.locator('header a').filter({ hasText: 'Home' });
    await homeLink.click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1').first()).toContainText('Next.js Auth0 Sample');
  });
  
  test('protected API endpoint returns 401 when not authenticated', async ({ request }) => {
    const response = await request.get('/api/protected');
    expect(response.status()).toBe(401);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('error', 'Authentication required');
  });
}); 