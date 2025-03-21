import { NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';

export async function GET() {
  try {
    // Check if the user is authenticated
    const session = await auth0.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Get the access token
    const token = await auth0.getAccessToken();
    
    // Here you would typically use the token to call an external API
    // For demo purposes, we're just returning user info
    return NextResponse.json({
      message: 'This is a protected API route',
      user: {
        sub: session.user.sub,
        name: session.user.name,
        email: session.user.email
      },
      tokenInfo: {
        // Don't expose the actual token in production
        tokenAvailable: !!token,
        expiresAt: token?.expiresAt ?? null
      }
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 