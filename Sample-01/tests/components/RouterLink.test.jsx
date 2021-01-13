import React from 'react';
import { render, screen } from '@testing-library/react';

import RouterLink from '../../components/RouterLink';

describe('RouterLink', () => {
  it('should render without crashing', async () => {
    render(
      <RouterLink testId="router-link" href="/url">
        Text
      </RouterLink>
    );

    expect(screen.getByTestId('router-link')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
