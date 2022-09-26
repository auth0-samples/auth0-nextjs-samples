import React from 'react';
import { render, screen } from '@testing-library/react';

import CSRPage from '../../pages/csr';

describe('csr', () => {
  it('should render without crashing', async () => {
    render(<CSRPage />);

    expect(screen.getByTestId('csr')).toBeInTheDocument();
    expect(screen.getByTestId('csr-title')).toBeInTheDocument();
    expect(screen.getByTestId('csr-text')).toBeInTheDocument();
  });
});
