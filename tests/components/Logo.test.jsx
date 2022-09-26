import React from 'react';
import { render, screen } from '@testing-library/react';

import Logo from '../../components/Logo';

describe('Logo', () => {
  it('should render without crashing', async () => {
    render(<Logo testId="logo" />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
