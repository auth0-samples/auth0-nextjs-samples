import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

// Mock user with all required properties
export const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  picture: 'https://example.com/picture.jpg',
  sub: 'auth0|123456789',
  nickname: 'testuser',
  updated_at: '2023-01-01T00:00:00.000Z',
};

// This will override the useUser hook and return customized values for tests
export const withUserProvider = ({ user, isLoading = false }) => {
  // Mock the useUser hook for the specific test
  useUser.mockImplementation(() => {
    return {
      user,
      isLoading,
      error: null,
    };
  });

  return ({ children }) => (
    <div data-testid="user-provider">
      {children}
    </div>
  );
};
