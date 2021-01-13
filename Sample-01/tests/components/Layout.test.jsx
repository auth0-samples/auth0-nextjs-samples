import React from 'react';
import { render, screen } from '@testing-library/react';

import Layout from '../../components/Layout';

describe('Layout', () => {
  it('should render without crashing', async () => {
    render(<Layout>Text</Layout>);

    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
