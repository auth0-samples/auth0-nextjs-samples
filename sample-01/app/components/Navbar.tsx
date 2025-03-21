'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Logo from './Logo';

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
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
            <Logo testId="navbar-logo" />
            Auth0 Next.js
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
              <>
                <Link 
                  href="/profile" 
                  className={isActive('/profile') ? 'active' : ''}
                  style={navLinkStyle('/profile')}
                >
                  Profile
                </Link>
              
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
              </>
            )}

            {!isLoading && (
              <>
                {user ? (
                  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile"
                        width="45"
                        height="45"
                        data-testid="navbar-picture"
                      />
                    )}
                    <Link 
                      href="/auth/logout" 
                      className="auth0-btn"
                      style={{ marginLeft: '0.5rem' }}
                    >
                      Log out
                    </Link>
                  </div>
                ) : (
                  <Link 
                    href="/auth/login" 
                    className="auth0-btn primary"
                    style={{ marginLeft: '1rem' }}
                  >
                    Log in
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