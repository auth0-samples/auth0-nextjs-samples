import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from '../../components/Loading';

describe('Loading', () => {
  it('should render without crashing', async () => {
    render(<Loading />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
