import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ApiDemo from '../../app/components/ApiDemo';
import * as auth0 from '@auth0/nextjs-auth0';

// Mock the getAccessToken function from Auth0
vi.mock('@auth0/nextjs-auth0', () => ({
  getAccessToken: vi.fn(),
}));

// Mock fetch globally
global.fetch = vi.fn();

describe('ApiDemo Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset fetch mock
    vi.mocked(global.fetch).mockReset();
  });

  test('renders component correctly', () => {
    render(<ApiDemo />);
    
    expect(screen.getByText(/API Demo/i)).toBeInTheDocument();
    expect(screen.getByText(/Call Protected API/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Access Token/i)).toBeInTheDocument();
  });

  test('calls API successfully and displays response', async () => {
    // Mock successful API response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ 
        message: 'This is a protected API route',
        user: { name: 'Test User' },
        tokenInfo: { tokenAvailable: true } 
      })
    } as Response);

    render(<ApiDemo />);
    
    // Click the "Call Protected API" button
    const callApiButton = screen.getByText(/Call Protected API/i);
    fireEvent.click(callApiButton);
    
    // Check loading state - use queryAllByText to handle multiple elements
    const loadingElements = screen.queryAllByText(/Loading.../i);
    expect(loadingElements.length).toBeGreaterThan(0);
    
    // Wait for response to be displayed
    await waitFor(() => {
      expect(screen.getByText(/"message":/i)).toBeInTheDocument();
      expect(screen.getByText(/"name": "Test User"/i)).toBeInTheDocument();
    });
    
    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/protected');
  });

  test('handles API error properly', async () => {
    // Mock API error
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized'
    } as Response);

    render(<ApiDemo />);
    
    // Click the "Call Protected API" button
    fireEvent.click(screen.getByText(/Call Protected API/i));
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/API call failed: 401/i)).toBeInTheDocument();
    });
  });

  test('gets access token successfully', async () => {
    // Mock successful token response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        message: 'Access token information',
        tokenAvailable: true,
        tokenType: 'Bearer'
      })
    } as Response);

    render(<ApiDemo />);
    
    // Click the "Get Access Token" button
    fireEvent.click(screen.getByText(/Get Access Token/i));
    
    // Wait for response to be displayed
    await waitFor(() => {
      expect(screen.getByText(/"message": "Access token information"/i)).toBeInTheDocument();
    });
  });

  test('handles token error properly', async () => {
    // Mock token error
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: 'Unauthorized'
    } as Response);

    render(<ApiDemo />);
    
    // Click the "Get Access Token" button
    fireEvent.click(screen.getByText(/Get Access Token/i));
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to get access token: 401/i)).toBeInTheDocument();
    });
  });
}); 