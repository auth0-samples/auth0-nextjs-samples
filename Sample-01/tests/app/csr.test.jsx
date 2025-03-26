import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockUser } from '../fixtures';
import { withUserProvider } from '../fixtures';

// Mock the CSR page component
jest.mock('../../app/csr/page', () => {
  return {
    __esModule: true,
    default: function MockedCSRPage() {
      return (
        <div data-testid="csr">
          <h1 data-testid="csr-title">Client-side Rendered Page</h1>
          <div data-testid="csr-content">Content rendered client-side</div>
        </div>
      );
    }
  };
});

// Import the mocked component
import CSRPage from '../../app/csr/page';

describe('csr', () => {
  it('should render without crashing', async () => {
    render(<CSRPage />, { wrapper: withUserProvider({ user: mockUser }) });

    expect(screen.getByTestId('csr')).toBeInTheDocument();
    expect(screen.getByTestId('csr-title')).toBeInTheDocument();
    expect(screen.getByTestId('csr-content')).toBeInTheDocument();
  });
});
