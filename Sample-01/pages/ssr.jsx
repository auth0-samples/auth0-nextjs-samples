import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Highlight from '../components/Highlight';

export default function SSRPage({ user }) {
  return (
    <>
      <div className="mb-5" data-testid="ssr">
        <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
        <div data-testid="ssr-text">
          <p>
            You can protect a server-side rendered page by wrapping the <code>getServerSideProps</code> function with{' '}
            <code>withPageAuthRequired</code>. Only logged in users will be able to access it. If the user is logged
            out, they will be redirected to the login page instead.{' '}
          </p>
          <p>
            Protected server-side rendered pages automatically receive a <code>user</code> prop containing the user
            profile.
          </p>
        </div>
      </div>
      <div className="result-block-container" data-testid="ssr-json">
        <div className="result-block">
          <h6 className="muted">User prop</h6>
          <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
