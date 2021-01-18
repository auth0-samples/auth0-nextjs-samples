import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import External from '../../pages/external';

describe('index', () => {
  afterAll(() => {
    delete global.fetch;
  });

  it('should render without crashing', async () => {
    render(<External />);

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(screen.getByTestId('external')).toBeInTheDocument();
    expect(screen.getByTestId('external-title')).toBeInTheDocument();
    expect(screen.getByTestId('external-text')).toBeInTheDocument();
    expect(screen.getByTestId('external-action')).toBeInTheDocument();
    expect(screen.queryByTestId('external-result')).not.toBeInTheDocument();
  });

  it('should render a spinner when the button is clicked', async () => {
    global.fetch = () => ({ json: () => Promise.resolve() });

    render(<External />);

    fireEvent.click(screen.getByTestId('external-action'));

    waitFor(() => screen.getByTestId('loading').toBeInTheDocument());
    waitFor(() => screen.queryByTestId('external-result').not.toBeInTheDocument());
  });

  it('should call the API when the button is clicked', async () => {
    global.fetch = () => ({ json: () => Promise.resolve({ msg: 'Text' }) });

    render(<External />);

    fireEvent.click(screen.getByTestId('external-action'));
    await waitFor(() => screen.getByTestId('external-result'));

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(await screen.findByText(/Text/)).toBeInTheDocument();
  });

  it('should render an error when the API call fails', async () => {
    global.fetch = () => ({ json: () => Promise.reject(new Error('Error')) });

    render(<External />);

    fireEvent.click(screen.getByTestId('external-action'));
    await waitFor(() => screen.getByTestId('external-result'));

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    expect(await screen.findByText('Error')).toBeInTheDocument();
  });
});
