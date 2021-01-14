import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ExternalApi from '../../pages/external';

describe('index', () => {
  afterAll(() => {
    delete global.fetch;
  });

  it('should render without crashing', async () => {
    render(<ExternalApi />);

    expect(screen.getByTestId('external')).toBeInTheDocument();
    expect(screen.getByTestId('external-title')).toBeInTheDocument();
    expect(screen.getByTestId('external-description')).toBeInTheDocument();
    expect(screen.getByTestId('external-action')).toBeInTheDocument();
    expect(screen.queryByTestId('external-result')).not.toBeInTheDocument();
  });

  it('should render a spinner when the button is clicked', async () => {
    global.fetch = () => ({ json: () => Promise.resolve() });

    render(<ExternalApi />);

    waitFor(() => screen.getByTestId('loading').toBeInTheDocument());
  });

  it('should call the API when the button is clicked', async () => {
    global.fetch = () => ({ json: () => Promise.resolve(JSON.stringify({ msg: 'Text' })) });

    render(<ExternalApi />);

    fireEvent.click(screen.getByTestId('external-action'));
    await waitFor(() => screen.getByTestId('external-result'));

    expect(await screen.findByText(/Text/)).toBeInTheDocument();
  });
});
