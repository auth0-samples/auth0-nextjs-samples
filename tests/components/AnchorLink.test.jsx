import React from 'react';
import { render, screen } from '@testing-library/react';

import AnchorLink from '../../components/AnchorLink';

describe('AnchorLink', () => {
  it('should render without crashing', async () => {
    render(
      <AnchorLink testId="anchor-link" href="/url">
        Text
      </AnchorLink>
    );

    expect(screen.getByTestId('anchor-link')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
