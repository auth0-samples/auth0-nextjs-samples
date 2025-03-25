import React from 'react';
import { auth0 } from '../../lib/auth0';
import Highlight from '../../components/Highlight';

export default async function SSRPage() {
  const session = await auth0.getSession();
  
  // Redirect to login if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  
  const { user } = session;
  
  return (
    <>
      <div className="mb-5" data-testid="ssr">
        <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
        <div data-testid="ssr-text">
          <p>
            You can protect a server-side rendered page by checking the session. Only
            logged in users will be able to access it. If the user is logged out, they will be redirected to the login
            page instead.{' '}
          </p>
        </div>
      </div>
      <div className="result-block-container" data-testid="ssr-json">
        <div className="result-block">
          <h6 className="muted">User</h6>
          <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
        </div>
      </div>
    </>
  );
}
