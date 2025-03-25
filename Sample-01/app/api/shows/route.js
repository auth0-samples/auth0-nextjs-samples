import { auth0 } from '../../../lib/auth0';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Check if user is authenticated
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get access token
    const { accessToken } = await auth0.getAccessToken();

    const apiPort = process.env.API_PORT || 3001;
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const shows = await response.json();

    return NextResponse.json(shows);
  } catch (error) {
    console.error('Auth0 or API error:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
