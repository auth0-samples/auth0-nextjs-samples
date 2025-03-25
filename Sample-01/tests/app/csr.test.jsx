import React from 'react';
import { render, screen } from '@testing-library/react';
import { Auth0Provider } from '@auth0/nextjs-auth0';

import CSRPage from '../../app/csr/page';

describe('csr', () => {
  it('should render without crashing', async () => {
    render(
      <Auth0Provider user={{}}>
        <CSRPage />
      </Auth0Provider>
    );

    expect(screen.getByTestId('csr')).toBeInTheDocument();
    expect(screen.getByTestId('csr-title')).toBeInTheDocument();
    expect(screen.getByTestId('csr-text')).toBeInTheDocument();
  });
});
