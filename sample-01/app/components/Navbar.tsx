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
          <Link href="/">
            <Logo></Logo>
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
                  <div className="profile-section">
                    {user.picture && (
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile"
                        width="40"
                        height="40"
                        data-testid="navbar-picture"
                      />
                    )}
                    <div className="profile-buttons">
                      <button className="button primary">
                        <Link 
                          href="/profile" 
                          style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                        >
                          View Profile
                        </Link>
                      </button>
                      <button className="button secondary">
                        <Link 
                          href="/auth/logout" 
                          style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                        >
                          Log out
                        </Link>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="button primary" style={{ marginLeft: '1rem' }}>
                    <Link 
                      href="/auth/login" 
                      style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                    >
                      Log in
                    </Link>
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 