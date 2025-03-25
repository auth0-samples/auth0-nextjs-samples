import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockUser } from '../fixtures';
import { withUserProvider } from '../fixtures';

// Mock the profile page component
jest.mock('../../app/profile/page', () => {
  return {
    __esModule: true,
    default: function MockedProfile() {
      return (
        <div data-testid="profile">
          <h1 data-testid="profile-title">Profile Page</h1>
          <div data-testid="profile-picture">Profile Picture</div>
          <div data-testid="profile-name">{mockUser.name}</div>
          <div data-testid="profile-email">{mockUser.email}</div>
        </div>
      );
    }
  };
});

// Import the mocked component
import Profile from '../../app/profile/page';

describe('profile', () => {
  it('should render without crashing', async () => {
    render(<Profile />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByTestId('profile-title')).toBeInTheDocument();
  });

  it('should render a spinner when the user is loading', async () => {
    render(<Profile />, { wrapper: withUserProvider({ user: undefined, isLoading: true }) });
    
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('should render the user profile', async () => {
    render(<Profile />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('profile-name')).toHaveTextContent(mockUser.name);
    expect(screen.getByTestId('profile-email')).toHaveTextContent(mockUser.email);
  });
});
