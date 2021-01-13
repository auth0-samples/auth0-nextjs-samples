import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Profile from '../../pages/profile';

describe('profile', () => {
  it('should render without crashing', async () => {
    render(<Profile />);

    await waitFor(() => expect(screen.getByTestId('profile-picture')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('profile-name')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByTestId('profile-info')).toBeInTheDocument());
  });
});
