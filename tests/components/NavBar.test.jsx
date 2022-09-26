import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { withUserProvider, mockUser } from '../fixtures';
import NavBar from '../../components/NavBar';

describe('NavBar', () => {
  it('should render in logged out state', async () => {
    render(<NavBar />, { wrapper: withUserProvider({ user: undefined }) });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-items')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-items').children).toHaveLength(1);
    expect(screen.getByTestId('navbar-home')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByTestId('navbar-login-desktop')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('navbar-login-mobile')).toBeInTheDocument());
    expect(screen.queryByTestId('navbar-menu-desktop')).not.toBeInTheDocument();
    expect(screen.queryByTestId('navbar-menu-mobile')).not.toBeInTheDocument();
  });

  it('should render in logged in state', async () => {
    render(<NavBar />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('navbar-items').children).toHaveLength(4);
    expect(screen.getByTestId('navbar-home')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-csr')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-ssr')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-external')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-menu-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-menu-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-picture-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-picture-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-user-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-user-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-profile-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-profile-mobile')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logout-desktop')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logout-mobile')).toBeInTheDocument();
  });
});
