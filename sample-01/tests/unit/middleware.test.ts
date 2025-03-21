import { describe, test, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '../../middleware';
import { auth0 } from '../../lib/auth0';

// Mock Auth0 client
vi.mock('../../lib/auth0', () => ({
  auth0: {
    middleware: vi.fn(),
  }
}));

describe('Middleware', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('middleware function exists', () => {
    expect(middleware).toBeDefined();
    expect(typeof middleware).toBe('function');
  });

  test('middleware calls auth0.middleware', async () => {
    const mockRequest = new NextRequest(new URL('http://localhost:3000/'));
    await middleware(mockRequest);
    
    expect(auth0.middleware).toHaveBeenCalledWith(mockRequest);
  });
}); 