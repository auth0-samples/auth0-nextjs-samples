import { useUser } from '@auth0/nextjs-auth0';
import React, { ReactElement } from 'react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import {User} from '@auth0/nextjs-auth0/types'

/**
 * Interface for the return value of the useAuthGuard hook
 */
interface AuthGuardResult {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** The user object if authenticated, undefined otherwise */
  user: User | undefined | null;
  /** Component to render during loading/error states or null if authenticated */
  guardComponent: ReactElement | null;
}

/**
 * A custom hook that handles common authentication guard patterns.
 * 
 * This hook centralizes the logic for checking authentication state
 * and redirecting users who aren't authenticated.
 * 
 * @returns An object with authentication state and components
 */
export function useAuthGuard(): AuthGuardResult {
  const { user, isLoading, error } = useUser();
  
  let guardComponent: ReactElement | null = null;
  
  if (isLoading) {
    guardComponent = <Loading />;
  } else if (error) {
    guardComponent = <ErrorMessage>{error.message}</ErrorMessage>;
  } else if (!user) {
    // Redirect to login if not authenticated
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
    guardComponent = <Loading />;
  }
  
  return {
    isAuthenticated: !!user && !isLoading && !error,
    user,
    guardComponent
  };
}

export default useAuthGuard; 