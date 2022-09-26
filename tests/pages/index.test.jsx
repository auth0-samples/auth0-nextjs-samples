import React from 'react';
import { render, screen } from '@testing-library/react';

import Index from '../../pages/index';

describe('index', () => {
  it('should render without crashing', async () => {
    render(<Index />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
