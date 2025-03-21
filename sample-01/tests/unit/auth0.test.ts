import { describe, test, expect, vi, beforeEach } from 'vitest';
import { auth0 } from '../../lib/auth0';

describe('Auth0 Client', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('Auth0 client is properly initialized', () => {
    expect(auth0).toBeDefined();
  });

  test('Auth0 client is an instance of Auth0Client', () => {
    expect(auth0.constructor.name).toBe('Auth0Client');
  });
}); 