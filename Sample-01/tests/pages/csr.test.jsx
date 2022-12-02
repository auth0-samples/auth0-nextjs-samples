import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import CSRPage from '../../pages/csr';

describe('csr', () => {
  it('should render without crashing', async () => {
    render(<UserProvider user={{}}><CSRPage /></UserProvider>);

    expect(screen.getByTestId('csr')).toBeInTheDocument();
    expect(screen.getByTestId('csr-title')).toBeInTheDocument();
    expect(screen.getByTestId('csr-text')).toBeInTheDocument();
  });
});
