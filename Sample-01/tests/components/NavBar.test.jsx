import React from 'react';
import { render, screen } from '@testing-library/react';

import NavBar from '../../components/NavBar';

describe('NavBar', () => {
  it('should render without crashing', async () => {
    render(<NavBar />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-items')).toBeInTheDocument();
  });

  /*
  it('should render in logged out state', async () => {
    render(<NavBar />);

    expect(screen.getByTestId('navbar-login-desktop')).toBeInTheDocument();
  });
  */

  it('should render in logged in state', async () => {
    render(<NavBar />);

    expect(screen.getByTestId('navbar-logout-desktop')).toBeInTheDocument();
  });
});
