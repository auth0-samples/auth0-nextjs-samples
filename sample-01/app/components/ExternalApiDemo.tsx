'use client';

import { useState } from 'react';
import styles from './ApiDemo.module.css';

interface ApiResponse {
  data?: Record<string, unknown>;
  error?: string;
}

export default function ExternalApiDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const callExternalApi = async () => {
    if (!apiUrl.trim()) {
      setApiResponse({ error: 'Please enter a valid API URL' });
      return;
    }

    setIsLoading(true);
    setApiResponse(null);
    
    try {
      // First, get access token from our token endpoint
      const tokenResponse = await fetch('/api/auth/token');
      
      if (!tokenResponse.ok) {
        throw new Error(`Failed to get access token: ${tokenResponse.status}`);
      }
      
      const tokenData = await tokenResponse.json();
      
      if (!tokenData.tokenAvailable) {
        throw new Error('No access token available. Make sure you are logged in and your account has appropriate permissions.');
      }
      
      // Now call the external API with the token
      // For demo purposes, we're using our proxy endpoint to avoid CORS issues
      const apiResponse = await fetch('/api/external-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: apiUrl }),
      });
      
      if (!apiResponse.ok) {
        throw new Error(`External API call failed: ${apiResponse.status}`);
      }
      
      const data = await apiResponse.json();
      setApiResponse({ data });
    } catch (err) {
      console.error('Error calling external API:', err);
      setApiResponse({ 
        error: err instanceof Error ? err.message : 'An unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.apiDemo}>
      <h2>External API Demo</h2>
      <p>
        This demonstrates how to call external APIs with your Auth0 access token.
        For demonstration purposes, we&apos;re using a proxy endpoint to avoid CORS issues.
      </p>
      
      <div className={styles.inputGroup}>
        <label htmlFor="apiUrl">API URL</label>
        <input 
          type="text" 
          id="apiUrl"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className={styles.apiInput}
          placeholder="Enter API URL"
        />
        <p className={styles.hint}>
          Enter a URL like https://jsonplaceholder.typicode.com/posts/1
        </p>
      </div>
      
      <div className={styles.buttonContainer}>
        <button 
          onClick={callExternalApi} 
          disabled={isLoading} 
          className={styles.button}
        >
          {isLoading ? 'Calling API...' : 'Call External API'}
        </button>
      </div>
      
      {apiResponse?.error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{apiResponse.error}</p>
        </div>
      )}
      
      {apiResponse?.data && (
        <div className={styles.resultContainer}>
          <h3>API Response</h3>
          <pre className={styles.jsonData}>
            {JSON.stringify(apiResponse.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 