/**
 * @jest-environment node
 */

import { NextResponse } from 'next/server';
import { GET as shows } from '../../../app/api/shows/route';

// Mock Next.js Response and auth0
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      status: options?.status || 200,
      json: () => Promise.resolve(data)
    }))
  }
}));

// Mock auth0 module before importing the route handler
jest.mock('../../../lib/auth0', () => ({
  auth0: {
    getSession: jest.fn().mockResolvedValue({ user: { sub: 'test-user' } }),
    getAccessToken: jest.fn().mockResolvedValue({ accessToken: 'test-token' })
  }
}));

// Create a mock request
const mockRequest = () => {
  return {};
};

describe('/api/shows', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    delete global.fetch;
  });

  it('should call the external API', async () => {
    // Mock the fetch response
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ msg: 'Text' })
    });

    // Call the API route
    const response = await shows(mockRequest());

    // Verify response
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ msg: 'Text' });
    
    // Verify fetch was called with the token
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/shows'),
      expect.objectContaining({
        headers: { Authorization: 'Bearer test-token' }
      })
    );
  });

  it('should fail when the external API call fails', async () => {
    // Mock fetch to throw an error
    const mockError = new Error('Error');
    global.fetch = jest.fn().mockRejectedValue(mockError);

    // Call the API route
    const response = await shows(mockRequest());

    // Verify response
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'Error' });
  });
});
