import React from 'react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import RoleBasedAccess from '../../app/components/RoleBasedAccess';
import TestWrapper from '../TestWrapper';

// Mock fetch
global.fetch = vi.fn();

describe('RoleBasedAccess Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(global.fetch).mockReset();
  });

  test('shows loading state initially', () => {
    // Mock fetch to not resolve yet
    vi.mocked(global.fetch).mockImplementation(() => new Promise(() => {}));
    
    render(
      <TestWrapper>
        <RoleBasedAccess />
      </TestWrapper>
    );
    
    expect(screen.getByText(/Loading user access information/i)).toBeInTheDocument();
  });

  test('displays user roles and permissions when data is loaded', async () => {
    // Mock successful response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        roles: ['read:user', 'update:profile'],
        permissions: [
          { resource: 'profile', action: 'read', description: 'Read profile info' },
          { resource: 'profile', action: 'update', description: 'Update profile' }
        ]
      })
    } as Response);
    
    render(
      <TestWrapper>
        <RoleBasedAccess />
      </TestWrapper>
    );
    
    // Wait for data to be loaded
    await waitFor(() => {
      expect(screen.getByText(/Your Roles/i)).toBeInTheDocument();
    });
    
    // Check that roles are displayed
    expect(screen.getByText(/read:user/i)).toBeInTheDocument();
    expect(screen.getByText(/update:profile/i)).toBeInTheDocument();
    
    // Check that permissions are displayed
    expect(screen.getByText(/Read profile info/i)).toBeInTheDocument();
    expect(screen.getByText(/Update profile/i)).toBeInTheDocument();
  });
  
  test('displays error message when API call fails', async () => {
    // Mock failed response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: () => Promise.resolve('Authentication required')
    } as Response);
    
    render(
      <TestWrapper>
        <RoleBasedAccess />
      </TestWrapper>
    );
    
    // Wait for error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch user roles/i)).toBeInTheDocument();
    });
    
    // Check that error details are displayed
    expect(screen.getByText(/setting up RBAC with Auth0/i)).toBeInTheDocument();
  });
}); 