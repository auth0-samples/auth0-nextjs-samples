import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { withUserProvider, mockUser } from '../fixtures';
import Profile from '../../pages/profile';

describe('profile', () => {
  it('should render without crashing', async () => {
    render(<Profile />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('profile')).toBeInTheDocument();
    expect(screen.getByTestId('profile-picture')).toBeInTheDocument();
    expect(screen.getByTestId('profile-name')).toBeInTheDocument();
    expect(screen.getByTestId('profile-info')).toBeInTheDocument();
  });

  it('should render a spinner when the user is loading', async () => {
    render(<Profile />, { wrapper: withUserProvider() });

    waitFor(() => screen.getByTestId('loading').toBeInTheDocument());
  });
});
