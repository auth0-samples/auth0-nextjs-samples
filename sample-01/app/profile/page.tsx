import { auth0 } from '../../lib/auth0';
import styles from './profile.module.css';

export default async function ProfilePage() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.detailCard}>
          <h2>Authentication Required</h2>
          <p>You must be logged in to view this page.</p>
          <div className={styles.profileActions}>
            <a href="/auth/login" className={styles.logoutButton}>Log In</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        {session.user.picture && (
          <img 
            src={session.user.picture} 
            alt="Profile" 
            className={styles.profileImage}
          />
        )}
        <div className={styles.profileInfo}>
          <h1>{session.user.name || 'User Profile'}</h1>
          <p>{session.user.email}</p>
        </div>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailCard}>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {session.user.name || 'Not provided'}</p>
          <p><strong>Email:</strong> {session.user.email || 'Not provided'}</p>
          <p><strong>Email Verified:</strong> {session.user.email_verified ? 'Yes' : 'No'}</p>
          <p><strong>User ID:</strong> {session.user.sub}</p>
        </div>

        <div className={styles.detailCard}>
          <h2>Raw Profile Data</h2>
          <pre className={styles.jsonData}>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
      </div>

      <div className={styles.profileActions}>
        <a href="/auth/logout" className={styles.logoutButton}>Logout</a>
      </div>
    </div>
  );
} 