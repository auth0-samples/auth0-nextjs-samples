import React from 'react';
import { render, screen } from '@testing-library/react';

import Hero from '../../components/Hero';

describe('Hero', () => {
  it('should render without crashing', async () => {
    render(<Hero />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('hero-logo')).toBeInTheDocument();
    expect(screen.getByTestId('hero-title')).toBeInTheDocument();
    expect(screen.getByTestId('hero-lead')).toBeInTheDocument();
  });
});
