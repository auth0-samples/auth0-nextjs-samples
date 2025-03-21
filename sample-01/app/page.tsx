import { auth0 } from '../lib/auth0';
import Image from 'next/image';
import styles from './page.module.css';

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>
          <span>Auth0</span> <span>Next.js</span> <span>Sample</span>
        </h1>
        <ul className={styles.featureList}>
          <li>Complete authentication with Auth0</li>
          <li>Use Session management for secure authentication flows</li>
          <li>Access user information in your Profile page</li>
          <li>Call protected API endpoints securely</li>
        </ul>
      </main>
    </div>
  );
} 