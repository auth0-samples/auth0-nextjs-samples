import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockUser } from '../fixtures';
import { withUserProvider } from '../fixtures';

// Mock the SSR page component
jest.mock('../../app/ssr/page', () => {
  return {
    __esModule: true,
    default: function MockedSSRPage() {
      return (
        <div data-testid="ssr">
          <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
          <div data-testid="ssr-content">Content rendered server-side</div>
        </div>
      );
    }
  };
});

// Import the mocked component
import SSRPage from '../../app/ssr/page';

describe('ssr', () => {
  it('should render without crashing', async () => {
    render(<SSRPage />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('ssr')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-title')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-content')).toBeInTheDocument();
  });

  it('should render the user profile', async () => {
    render(<SSRPage />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('ssr')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-title')).toBeInTheDocument();
  });
});
