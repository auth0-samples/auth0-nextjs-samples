import { NextResponse } from 'next/server';
import { auth0 } from '../../../../lib/auth0';

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) {
      return NextResponse.json(null, { status: 401 });
    }

    return NextResponse.json(session.user, { status: 200 });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 