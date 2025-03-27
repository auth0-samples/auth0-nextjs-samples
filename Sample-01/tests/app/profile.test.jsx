import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { withAuth0Provider, mockUser } from '../fixtures';
import Profile from '../../app/profile/page';

describe('profile', () => {
  it('should render without crashing', async () => {
    render(<Profile />, { wrapper: withAuth0Provider({ user: mockUser }) });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByTestId('profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('profile-name')).toBeInTheDocument();
    expect(screen.getByTestId('profile-json')).toBeInTheDocument();
  });

  it('should render a spinner when the user is loading', async () => {
    render(<Profile />, { wrapper: withAuth0Provider({ user: undefined }) });

    waitFor(() => screen.getByTestId('loading').toBeInTheDocument());
    waitFor(() => screen.queryByTestId('profile').not.toBeInTheDocument());
  });

  it('should render the user profile', async () => {
    render(<Profile />, { wrapper: withAuth0Provider({ user: mockUser }) });

    waitFor(() => screen.queryByTestId('loading').not.toBeInTheDocument());
    Object.keys(mockUser).forEach(key => {
      () => screen.getByTestId('profile-json').text().toContain(mockUser[key]);
    });
  });
});
