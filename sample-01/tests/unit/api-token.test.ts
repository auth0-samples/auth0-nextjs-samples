import { describe, test, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '../../lib/auth0';
import { GET } from '../../app/api/auth/token/route';

// Mock Auth0 client
vi.mock('../../lib/auth0', () => ({
  auth0: {
    getSession: vi.fn(),
    getAccessToken: vi.fn(),
  },
}));

describe('Token API Route', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('returns 401 when user is not authenticated', async () => {
    // Mock getSession to return null (unauthenticated)
    vi.mocked(auth0.getSession).mockResolvedValueOnce(null);

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(401);
    
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Unauthorized' });
  });

  test('returns token information when authenticated', async () => {
    // Mock authenticated user session with required properties
    const mockUser = {
      sub: 'auth0|123456789',
      name: 'Test User',
      email: 'test@example.com',
    };
    
    // Create a session with the required properties
    vi.mocked(auth0.getSession).mockResolvedValueOnce({ 
      user: mockUser,
      tokenSet: { access_token: 'mock-token' },
      internal: {}
    } as any);

    // Mock access token
    vi.mocked(auth0.getAccessToken).mockResolvedValueOnce({ 
      token: 'mock-token',
      expiresAt: Math.floor(Date.now() / 1000) + 3600 // expires in 1 hour
    });

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('message', 'Access token information');
    expect(responseData).toHaveProperty('tokenAvailable', true);
    expect(responseData).toHaveProperty('tokenType', 'Bearer');
    expect(responseData).toHaveProperty('userInfo');
    expect(responseData.userInfo).toEqual({
      sub: mockUser.sub,
      name: mockUser.name,
      email: mockUser.email
    });
  });

  test('handles error when access token acquisition fails', async () => {
    // Mock authenticated user
    const mockUser = {
      sub: 'auth0|123456789',
      name: 'Test User',
      email: 'test@example.com',
    };
    
    // Create a session with the required properties
    vi.mocked(auth0.getSession).mockResolvedValueOnce({ 
      user: mockUser,
      tokenSet: { access_token: 'mock-token' },
      internal: {}
    } as any);

    // Mock access token error
    vi.mocked(auth0.getAccessToken).mockRejectedValueOnce(new Error('Failed to get access token'));
    
    // Spy on console.error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('tokenAvailable', false);
    expect(responseData).toHaveProperty('tokenType', null);
    
    // Verify error was logged
    expect(consoleSpy).toHaveBeenCalled();
    
    // Restore console.error
    consoleSpy.mockRestore();
  });
}); 