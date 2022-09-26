import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockUser } from '../fixtures';
import SSRPage from '../../pages/ssr';

describe('ssr', () => {
  it('should render without crashing', async () => {
    render(<SSRPage />);

    expect(screen.getByTestId('ssr')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-title')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-text')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-json')).toBeInTheDocument();
  });

  it('should render the user profile', async () => {
    render(<SSRPage user={mockUser} />);

    Object.keys(mockUser).forEach(key => {
      () => screen.getByTestId('ssr-json').text().toContain(mockUser[key]);
    });
  });
});
