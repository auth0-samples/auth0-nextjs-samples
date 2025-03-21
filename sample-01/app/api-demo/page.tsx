import { auth0 } from '../../lib/auth0';
import ApiDemo from '../components/ApiDemo';
import ExternalApiDemo from '../components/ExternalApiDemo';
import { Auth0Provider } from '@auth0/nextjs-auth0';

export default async function ApiDemoPage() {
  const session = await auth0.getSession();

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>API Integration Demo</h1>
      <p>
        This page demonstrates how to use Auth0 access tokens to call protected APIs.
        You can access this page whether you are logged in or not, but the API calls
        will only work if you&apos;re authenticated.
      </p>

      {!session && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeeba',
          borderRadius: '0.25rem',
          marginTop: '1rem'
        }}>
          <p style={{ color: '#856404', margin: 0 }}>
            <strong>Note:</strong> You are not currently logged in. API calls will fail without authentication.
            <a href="/auth/login" style={{ marginLeft: '0.5rem' }}>Log in</a>
          </p>
        </div>
      )}

      <Auth0Provider user={session?.user}>
        <ApiDemo />
        <ExternalApiDemo />
      </Auth0Provider>

      {session && (
        <div style={{ marginTop: '2rem' }}>
          <h2>How it Works</h2>
          <p>
            When authenticated, calling API routes in this application automatically includes your session
            information. For external APIs, you&apos;ll need to explicitly request an access token using the
            <code>getAccessToken()</code> function from the Auth0 SDK.
          </p>
          <p>
            The token is automatically refreshed if needed and is stored securely in an HTTP-only cookie.
          </p>
          
          <h3 style={{ marginTop: '1.5rem' }}>Security Best Practices</h3>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.6' }}>
            <li>Never expose access tokens to the client-side JavaScript</li>
            <li>Use a server-side proxy to make authenticated API calls</li>
            <li>Validate and sanitize all user inputs before forwarding to external APIs</li>
            <li>Use allowlists to restrict which external domains can be called</li>
            <li>Implement proper error handling and logging</li>
          </ul>
        </div>
      )}
    </div>
  );
} 