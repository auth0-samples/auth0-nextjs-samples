"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function ClientAuth() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading as client component...</p>;
  }

  if (!user) {
    return (
      <>
        <a href="/auth/login?screen_hint=signup">Signup</a>
        <br />
        <a href="/auth/login">Login</a>
      </>
    );
  }

  return (
    <>
      <p>Logged in as {user.email}</p>

      <h1>User Profile</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/auth/logout">Logout</a>
    </>
  );
}
