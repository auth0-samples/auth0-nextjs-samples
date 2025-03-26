import { auth0 } from '../../../lib/auth0';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Check if user is authenticated
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const accessToken = await auth0.getAccessToken();
    // console.log('Access token:', accessToken);
  
    const apiPort = process.env.API_PORT || 3001;
    const apiUrl = `http://localhost:${apiPort}/api/shows`;    
    
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken.token}`
      }
    });
    
    // Check if response is unsuccessful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API response error:', response.status, errorText);
      return NextResponse.json(
        { error: `API error: ${response.status}` }, 
        { status: response.status }
      );
    }
  

    const shows = await response.json();

    return NextResponse.json(shows);
  } catch (error) {
    console.error('Auth0 or API error:', error);
    return NextResponse.json({ error: error.message }, { status: error.status || 500 });
  }
}
