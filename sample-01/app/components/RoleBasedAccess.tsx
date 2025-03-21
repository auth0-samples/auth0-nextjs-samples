'use client';

import { useState, useEffect } from 'react';
import styles from './ApiDemo.module.css';

type Permission = {
  resource?: string;
  action?: string;
  description?: string;
};

type UserAccess = {
  roles: string[];
  permissions: Permission[];
  error?: string;
};

export default function RoleBasedAccess() {
  const [isLoading, setIsLoading] = useState(true);
  const [userAccess, setUserAccess] = useState<UserAccess>({ 
    roles: [], 
    permissions: [] 
  });

  useEffect(() => {
    const fetchUserAccess = async () => {
      try {
        const response = await fetch('/api/auth/roles');
        
        if (response.ok) {
          const data = await response.json();
          setUserAccess(data);
        } else {
          const errorText = await response.text();
          setUserAccess({ 
            roles: [], 
            permissions: [], 
            error: `Failed to fetch user roles: ${response.status} - ${errorText}` 
          });
        }
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setUserAccess({ 
          roles: [], 
          permissions: [], 
          error: error instanceof Error ? error.message : 'An unknown error occurred' 
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAccess();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.apiDemo}>
        <h2>Role-Based Access Control</h2>
        <p>Loading user access information...</p>
      </div>
    );
  }

  if (userAccess.error) {
    return (
      <div className={styles.apiDemo}>
        <h2>Role-Based Access Control</h2>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{userAccess.error}</p>
        </div>
        <p>
          To use role-based access control, your Auth0 account needs to be set up with:
        </p>
        <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Custom claims in your JWT tokens with permissions</li>
          <li>Roles assigned to your user</li>
          <li>Permissions assigned to those roles</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          <a 
            href="https://auth0.com/docs/manage-users/access-control/rbac" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Learn more about setting up RBAC with Auth0
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.apiDemo}>
      <h2>Role-Based Access Control</h2>
      <p>
        This component demonstrates how to implement role-based access control (RBAC) 
        with Auth0. Below you can see your assigned roles and permissions.
      </p>

      <div className={styles.resultContainer} style={{ marginTop: '1.5rem' }}>
        <h3>Your Roles</h3>
        {userAccess.roles.length > 0 ? (
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
            {userAccess.roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        ) : (
          <p>You don&apos;t have any assigned roles.</p>
        )}
      </div>

      {userAccess.permissions.length > 0 && (
        <div className={styles.resultContainer} style={{ marginTop: '1.5rem' }}>
          <h3>Your Permissions</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Resource</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Action</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {userAccess.permissions.map((permission, index) => (
                <tr key={index}>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>{permission.resource || '-'}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>{permission.action || '-'}</td>
                  <td style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>{permission.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <h3>Working with RBAC</h3>
        <p>
          To implement access control in your application:
        </p>
        <ol style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Extract roles and permissions from the JWT token</li>
          <li>Create UI components that render conditionally based on roles</li>
          <li>Implement server-side checks for secure authorization</li>
        </ol>
      </div>
    </div>
  );
} 