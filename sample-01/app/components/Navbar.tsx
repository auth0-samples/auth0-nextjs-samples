'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

type User = {
  email?: string;
  name?: string;
  sub?: string;
  picture?: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navLinkStyle = (path: string) => ({
    fontWeight: isActive(path) ? 'bold' : 'normal',
    borderBottom: isActive(path) ? '2px solid var(--primary)' : 'none'
  });

  return (
    <header className="app-header">
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            Auth0 Next.js Demo
          </Link>
          <div className="nav-links">
            <Link 
              href="/" 
              className={isActive('/') ? 'active' : ''}
              style={navLinkStyle('/')}
            >
              Home
            </Link>
            
            {user && (
              <Link 
                href="/profile" 
                className={isActive('/profile') ? 'active' : ''}
                style={navLinkStyle('/profile')}
              >
                Profile
              </Link>
            )}

            <Link 
              href="/api-demo" 
              className={isActive('/api-demo') ? 'active' : ''}
              style={navLinkStyle('/api-demo')}
            >
              API Demo
            </Link>

            <Link 
              href="/rbac-demo" 
              className={isActive('/rbac-demo') ? 'active' : ''}
              style={navLinkStyle('/rbac-demo')}
            >
              RBAC Demo
            </Link>

            {!isLoading && (
              <>
                {user ? (
                  <Link 
                    href="/auth/logout" 
                    style={{ 
                      backgroundColor: 'var(--secondary)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      marginLeft: '1rem'
                    }}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link 
                    href="/auth/login" 
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      marginLeft: '1rem'
                    }}
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 