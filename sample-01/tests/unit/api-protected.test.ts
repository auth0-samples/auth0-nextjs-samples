import { describe, test, expect, vi, beforeEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '../../lib/auth0';
import { GET } from '../../app/api/protected/route';

// Mock Auth0 client
vi.mock('../../lib/auth0', () => ({
  auth0: {
    getSession: vi.fn(),
    getAccessToken: vi.fn(),
  },
}));

describe('Protected API Route', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    vi.resetAllMocks();
    mockRequest = new NextRequest(new URL('http://localhost:3000/api/protected'));
  });

  test('returns 401 when user is not authenticated', async () => {
    // Mock getSession to return null (unauthenticated)
    vi.mocked(auth0.getSession).mockResolvedValueOnce(null);

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(401);
    
    const responseData = await response.json();
    expect(responseData).toEqual({ error: 'Authentication required' });
  });

  test('returns user data when authenticated', async () => {
    // Mock authenticated user session with required properties
    const mockUser = {
      sub: 'auth0|123456789',
      name: 'Test User',
      email: 'test@example.com',
    };
    
    // Create a session with the required tokenSet and internal properties
    vi.mocked(auth0.getSession).mockResolvedValueOnce({ 
      user: mockUser,
      tokenSet: { access_token: 'mock-token' },
      internal: {}
    } as any);

    // Add expiresAt to the access token return value
    vi.mocked(auth0.getAccessToken).mockResolvedValueOnce({ 
      token: 'mock-token',
      expiresAt: Math.floor(Date.now() / 1000) + 3600 // expires in 1 hour
    });

    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    
    const responseData = await response.json();
    expect(responseData).toHaveProperty('message');
    expect(responseData).toHaveProperty('user');
    expect(responseData.user).toEqual({
      sub: mockUser.sub,
      name: mockUser.name,
      email: mockUser.email
    });
    expect(responseData).toHaveProperty('tokenInfo');
    expect(responseData.tokenInfo.tokenAvailable).toBe(true);
  });
}); 