import { NextResponse } from 'next/server';
import { auth0 } from '../../../../lib/auth0';

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get access token if available
    let accessToken = null;
    try {
      accessToken = await auth0.getAccessToken();
    } catch (e) {
      console.error('Error getting access token:', e);
    }

    // Don't return the actual token for security reasons,
    // just return information about it
    return NextResponse.json({
      message: 'Access token information',
      tokenAvailable: !!accessToken,
      tokenType: accessToken ? 'Bearer' : null,
      userInfo: {
        sub: session.user.sub,
        name: session.user.name,
        email: session.user.email
      }
    });
  } catch (error) {
    console.error('Error in /api/auth/token:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 