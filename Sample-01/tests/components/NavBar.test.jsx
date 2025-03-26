import React from 'react';
import { render, screen } from '@testing-library/react';

import { withUserProvider, mockUser } from '../fixtures';
import NavBar from '../../components/NavBar';

// Mock the useUser hook to have proper control in tests
jest.mock('@auth0/nextjs-auth0/client', () => {
  return {
    useUser: jest.fn(() => {
      // This will be overridden by the withUserProvider
      return {
        user: null,
        isLoading: false,
        error: null,
      };
    }),
  };
});

describe('NavBar', () => {
  it('should render in logged out state', async () => {
    render(<NavBar />, { wrapper: withUserProvider({ user: undefined }) });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-items')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-home')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-login-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-login-mobile')).toBeInTheDocument();
  });

  it('should render in logged in state', async () => {
    render(<NavBar />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-home')).toBeInTheDocument();
    
    // Check for user menu and profile elements that are present when logged in
    expect(screen.getByTestId('navbar-menu-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-picture-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-user-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-profile-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logout-desktop')).toBeInTheDocument();
    
    // Check for mobile menu elements
    expect(screen.getByTestId('navbar-menu-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-picture-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-user-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-profile-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logout-mobile')).toBeInTheDocument();
  });
});
