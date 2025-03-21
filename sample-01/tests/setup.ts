import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock Auth0 context
vi.mock('@auth0/nextjs-auth0', () => {
  return {
    getSession: vi.fn(() => Promise.resolve({
      user: {
        sub: 'auth0|123456789',
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://example.com/avatar.png',
      },
      accessToken: 'mock-access-token',
    })),
    getAccessToken: vi.fn(() => Promise.resolve({ accessToken: 'mock-access-token' })),
  };
});

// Mock global fetch
global.fetch = vi.fn();

// Global environment variables for tests
process.env.AUTH0_SECRET = 'some-secret';
process.env.AUTH0_BASE_URL = 'http://localhost:3000';
process.env.AUTH0_ISSUER_BASE_URL = 'https://test.auth0.com';
process.env.AUTH0_CLIENT_ID = 'test-client-id';
process.env.AUTH0_CLIENT_SECRET = 'test-client-secret'; 