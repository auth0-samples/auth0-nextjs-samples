import { NextRequest, NextResponse } from 'next/server';
import { auth0 } from '../../../lib/auth0';

export async function POST(request: NextRequest) {
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
    const accessToken = await auth0.getAccessToken();
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token available' },
        { status: 403 }
      );
    }

    // Parse the request body to get the URL to call
    const body = await request.json();
    
    if (!body.url) {
      return NextResponse.json(
        { error: 'Missing URL parameter' },
        { status: 400 }
      );
    }

    // Validate the URL (basic validation)
    let targetUrl: URL;
    try {
      targetUrl = new URL(body.url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // For security, you may want to restrict which domains can be called
    // This is just a simple example - in production you should implement more robust checks
    const allowedDomains = [
      'jsonplaceholder.typicode.com',
      'api.github.com',
      'api.example.com'
    ];

    if (!allowedDomains.includes(targetUrl.hostname)) {
      return NextResponse.json(
        { error: `Domain not allowed. Allowed domains: ${allowedDomains.join(', ')}` },
        { status: 403 }
      );
    }

    // Make the external API call with the access token
    const headers: HeadersInit = {
      'Authorization': `Bearer ${accessToken.token}`,
      'Content-Type': 'application/json'
    };

    const apiResponse = await fetch(targetUrl.toString(), {
      headers,
      // Forward method, body, etc. if needed:
      // method: request.method,
      // body: request.body ? request.body : undefined,
    });

    // If the API returns a non-200 status code
    if (!apiResponse.ok) {
      return NextResponse.json(
        { 
          error: 'External API error', 
          status: apiResponse.status,
          statusText: apiResponse.statusText
        },
        { status: apiResponse.status }
      );
    }

    // Return the API response data
    const data = await apiResponse.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('External API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 