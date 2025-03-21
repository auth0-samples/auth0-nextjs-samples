'use client';

import { useState } from 'react';
import styles from './ApiDemo.module.css';

interface ApiResponse {
  message?: string;
  user?: {
    sub?: string;
    name?: string;
    email?: string;
  };
  tokenInfo?: {
    tokenAvailable: boolean;
    expiresAt: number | null;
  };
  error?: string;
}

export default function ApiDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Call our protected API
      const response = await fetch('/api/protected');
      
      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }
      
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      console.error('Error calling API:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const callExternalApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get access token through our custom endpoint
      const response = await fetch('/api/auth/token');
      
      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.status}`);
      }
      
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      console.error('Error getting access token:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.apiDemo}>
      <h2>API Demo</h2>
      <p>
        Click the buttons below to test API calls. The first button calls a protected API route in this 
        application. The second button demonstrates acquiring an access token for external API calls.
      </p>
      
      <div className={styles.buttonContainer}>
        <button onClick={callApi} disabled={isLoading} className={styles.button}>
          {isLoading ? 'Loading...' : 'Call Protected API'}
        </button>
        <button onClick={callExternalApi} disabled={isLoading} className={styles.button}>
          {isLoading ? 'Loading...' : 'Get Access Token'}
        </button>
      </div>
      
      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
      
      {apiData && (
        <div className={styles.resultContainer}>
          <h3>API Response</h3>
          <pre className={styles.jsonData}>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 