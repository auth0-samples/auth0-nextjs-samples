import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '../../components/Footer';

describe('Footer', () => {
  it('should render without crashing', async () => {
    render(<Footer />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('footer-logo')).toBeInTheDocument();
    expect(screen.getByTestId('footer-text')).toBeInTheDocument();
  });
});
