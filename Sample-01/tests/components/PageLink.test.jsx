import React from 'react';
import { render, screen } from '@testing-library/react';

import PageLink from '../../components/PageLink';

describe('PageLink', () => {
  it('should render without crashing', async () => {
    render(
      <PageLink testId="page-link" href="/url">
        Text
      </PageLink>
    );

    expect(screen.getByTestId('page-link')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
