import { auth0 } from '../lib/auth0';
import styles from './page.module.css';

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span style={{ color: 'var(--secondary)' }}>Auth0</span> + <span style={{ color: 'var(--primary)' }}>Next.js</span>
        </h1>
        <p className={styles.description}>
          A minimal implementation of Auth0 v4 with Next.js 15+
        </p>
        
        <div className={styles.authButtons}>
          {session ? (
            <div className={styles.loggedIn}>
              <p>Welcome, {session.user.name || 'User'}</p>
              <div className={styles.buttons}>
                <a href="/profile" className="auth0-btn primary">
                  View Profile
                </a>
                <a href="/auth/logout" className="auth0-btn" style={{ marginLeft: '10px' }}>
                  Log Out
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.loggedOut}>
              <div className={styles.buttons}>
                <a href="/auth/login?screen_hint=signup" className="auth0-btn primary">
                  Sign Up
                </a>
                <a href="/auth/login" className="auth0-btn" style={{ marginLeft: '10px' }}>
                  Log In
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h2>Authentication</h2>
          <ul>
            <li>Universal Login</li>
            <li>Social Identity Providers</li>
            <li>Role-based access control</li>
            <li>Session management</li>
          </ul>
        </div>
        
        <div className={styles.featureCard}>
          <h2>Security</h2>
          <ul>
            <li>HTTP-only cookies</li>
            <li>CSRF protection</li>
            <li>Automatic session rotation</li>
            <li>Edge-compatible architecture</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 