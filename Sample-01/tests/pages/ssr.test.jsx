import React from 'react';
import { render, screen } from '@testing-library/react';

import SSRPage from '../../pages/ssr';

describe('ssr', () => {
  it('should render without crashing', async () => {
    render(<SSRPage />);

    expect(screen.getByTestId('ssr')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-title')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-text')).toBeInTheDocument();
    expect(screen.getByTestId('ssr-json')).toBeInTheDocument();
  });
});
