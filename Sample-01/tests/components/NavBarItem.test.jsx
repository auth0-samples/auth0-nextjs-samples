import React from 'react';
import { render, screen } from '@testing-library/react';

import NavBarItem from '../../components/NavBarItem';

describe('NavBarItem', () => {
  it('should render without crashing', async () => {
    render(
      <NavBarItem testId="navbar-item" href="/url">
        Text
      </NavBarItem>
    );

    expect(screen.getByTestId('navbar-item')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
