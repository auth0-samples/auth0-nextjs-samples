import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
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
      <p>Logged in as {session.user.email}</p>

      <h1>User Profile</h1>

      <pre>{JSON.stringify(session.user, null, 2)}</pre>

      <a href="/auth/logout">Logout</a>
    </>
  );
}
