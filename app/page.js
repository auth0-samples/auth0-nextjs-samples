import { auth0 } from "@/lib/auth0";

export default async function Home() {
  // Check if user is authenticated
  /* highlight-start session */
  const session = await auth0.getSession();
  /* highlight-end session */

  if (!session) {
    return (
      <>
        {/* Redirects to Auth0 to sign up */}
        {/* highlight-start signup */}
        <a href="/auth/login?screen_hint=signup">Signup</a>
        {/* highlight-end signup */}
        <br />
        {/* Redirects to Auth0 to log in */}
        {/* highlight-start login */}
        <a href="/auth/login">Login</a>
        {/* highlight-end login */}
      </>
    );
  }

  return (
    <>
      <p>Logged in as {session.user.email}</p>

      {/* Display user info (name, email, etc.) */}
      {/* highlight-start profile */}
      <h1>User Profile</h1>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      {/* highlight-end profile */}

      {/* Ends the session and redirects to Auth0 to log out */}
      {/* highlight-start logout */}
      <a href="/auth/logout">Logout</a>
      {/* highlight-end logout */}
    </>
  );
}
