import { describe, test, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '../../middleware';
import { auth0 } from '../../lib/auth0';

// Mock Auth0 client with middleware method that returns a Promise
vi.mock('../../lib/auth0', () => ({
  auth0: {
    middleware: vi.fn()
  }
}));

describe('Middleware Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('middleware passes the request to auth0.middleware', async () => {
    const mockRequest = new NextRequest(new URL('http://localhost:3000/'));
    await middleware(mockRequest);
    
    // Verify auth0.middleware was called with the request
    expect(auth0.middleware).toHaveBeenCalledWith(mockRequest);
  });
}); 