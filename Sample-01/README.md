# Auth0 Next.js SDK Sample Application

This sample demonstrates the integration of [Auth0 Next.js SDK v4](https://github.com/auth0/nextjs-auth0) into a Next.js application created using [create-next-app](https://nextjs.org/docs/api-reference/create-next-app). The sample is a companion to the [Auth0 Next.js SDK Quickstart](https://auth0.com/docs/quickstart/webapp/nextjs).

This sample demonstrates the following use cases:

- Login
- Logout
- Showing the user profile
- Protecting routes using middleware
- Calling APIs with access tokens

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

## Configuration

### Create an API

For the **External API** page to work, you will need to [create an API](https://auth0.com/docs/authorization/apis) using the [management dashboard](https://manage.auth0.com/#/apis). This will give you an API Identifier that you can use in the `AUTH0_AUDIENCE` environment variable below. Then you will need to [add a permission](https://auth0.com/docs/get-started/dashboard/add-api-permissions) named `read:shows` to your API.

If you do not wish to use an API or observe the API call working, you should not specify the `AUTH0_AUDIENCE` value in the next steps.

### Configure credentials

The project needs to be configured with your Auth0 Domain, Client ID and Client Secret for the authentication flow to work.

To do this, first copy `.env.local.example` into a new file in the same folder called `.env.local`, and replace the values with your own Auth0 application credentials:

```sh
# A long secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
# Your Auth0 tenant domain
AUTH0_DOMAIN='YOUR_AUTH0_DOMAIN.auth0.com'
# The base url of your application
APP_BASE_URL='http://localhost:3000'
```

**Note**: Make sure you replace `AUTH0_SECRET` with your own secret (you can generate a suitable string using `openssl rand -hex 32` on the command line).

## Step-by-Step Implementation Guide

This guide will walk you through integrating Auth0 with Next.js using the Auth0 Next.js SDK v4.

### Step 1: Create a Next.js App

If you don't have an existing Next.js application, create one using:

```bash
npx create-next-app@latest my-auth0-app
cd my-auth0-app
```

### Step 2: Install the Auth0 SDK

Install the Auth0 Next.js SDK v4:

```bash
npm install @auth0/nextjs-auth0@4.0.0
```

### Step 3: Set Up Auth0 Configuration

1. **Set up your Auth0 account**:
   - Sign up for an Auth0 account at [https://auth0.com](https://auth0.com) if you don't have one
   - Create a new application in the Auth0 Dashboard
   - Choose "Regular Web Application" as the application type

2. **Configure Auth0 application settings**:
   - Set the "Allowed Callback URLs" to `http://localhost:3000/api/auth/callback`
   - Set the "Allowed Logout URLs" to `http://localhost:3000`
   - Set the "Allowed Web Origins" to `http://localhost:3000`

3. **Create the environment variables file**:
   - Create a `.env.local` file in your project root with the following variables:

   ```sh
   # A long secret value used to encrypt the session cookie
   AUTH0_SECRET=$(openssl rand -hex 32)
   # Your Auth0 application's Client ID
   AUTH0_CLIENT_ID=your_client_id
   # Your Auth0 application's Client Secret
   AUTH0_CLIENT_SECRET=your_client_secret
   # Your Auth0 tenant domain
   AUTH0_DOMAIN=your_domain.auth0.com
   # The base url of your application
   APP_BASE_URL=http://localhost:3000
   ```

### Step 4: Initialize the Auth0 Client

Create a file at `lib/auth0.ts` with the following content:

```typescript
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  authorizationParameters: {
    scope: "openid profile email",
  }
}); 
```

If you need to call an API, adjust the scope to include the required permissions:

```typescript
authorizationParameters: {
  scope: "openid profile email read:shows",
}
```

### Step 5: Set Up Middleware for Route Protection

Create a file named `middleware.ts` in your project root:

```typescript
import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
```

This middleware will handle authentication for all routes except static assets.

### Step 6: Create Auth Routes

Create the login, logout, and callback route handlers in the App Router:

1. **Create the login API route** at `app/api/auth/login/route.ts`:

```typescript
import { auth0 } from "../../../../lib/auth0";
import { NextResponse } from "next/server";

export const GET = async () => {
  return await auth0.login();
};
```

2. **Create the logout API route** at `app/api/auth/logout/route.ts`:

```typescript
import { auth0 } from "../../../../lib/auth0";
import { NextResponse } from "next/server";

export const GET = async () => {
  return await auth0.logout();
};
```

3. **Create the callback API route** at `app/api/auth/callback/route.ts`:

```typescript
import { auth0 } from "../../../../lib/auth0";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  return await auth0.callback();
};
```

### Step 7: Create a Profile Page

Create a profile page to display user information at `app/profile/page.tsx`:

```typescript
import { auth0 } from "../../lib/auth0";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth0.getSession();
  
  // Redirect to login if not authenticated
  if (!session?.user) {
    return redirect("/api/auth/login");
  }
  
  return (
    <div>
      <h1>Profile</h1>
      <h2>{session.user.name}</h2>
      <p>{session.user.email}</p>
      <img src={session.user.picture} alt="Profile" width="100" />
      
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
```

### Step 8: Create Navigation Component

Create a navigation component with login/logout buttons at `components/NavBar.tsx`:

```typescript
import Link from "next/link";
import { auth0 } from "../lib/auth0";

export default async function NavBar() {
  const session = await auth0.getSession();
  const isAuthenticated = !!session?.user;

  return (
    <nav>
      <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        )}
        <li>
          {isAuthenticated ? (
            <a href="/api/auth/logout">Logout</a>
          ) : (
            <a href="/api/auth/login">Login</a>
          )}
        </li>
      </ul>
    </nav>
  );
}
```

### Step 9: Integrate API Access (Optional)

If you want to access an external API with the user's access token, create an API route:

```typescript
// app/api/shows/route.js
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
```

### Step 10: Update Root Layout

Add the NavBar to your root layout at `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';
import NavBar from '../components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Step 11: Start your Application

Start your Next.js application:

```bash
npm run dev
```

Visit http://localhost:3000 and test the authentication flow.

## Key Changes in v4

This sample has been updated to use Auth0 NextJS SDK v4, which includes several important changes:

1. **New Auth0Client Class**: We now use the `Auth0Client` from `@auth0/nextjs-auth0/server` which provides a simpler API.

2. **Middleware-based Protection**: Route protection now uses Next.js middleware instead of higher-order components or hooks for server-side protection.

3. **App Router Support**: The sample now works with Next.js App Router, with API routes implemented as route handlers.

4. **TypeScript Support**: The sample uses TypeScript for improved type safety.

5. **Environment Variables**: The configuration has been simplified with the required environment variables loaded automatically.

## Implementation Details

### Auth0 Client Initialization

```typescript
// lib/auth0.ts
import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  authorizationParameters: {
    scope: "openid profile email offline_access read:shows",
  }
}); 
```

### Middleware for Route Protection

```typescript
// middleware.ts
import type { NextRequest } from "next/server"
import { auth0 } from "./lib/auth0"

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
```

### API Route Implementation

```javascript
// app/api/shows/route.js
import { auth0 } from '../../../lib/auth0';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { accessToken } = await auth0.getAccessToken();
    // Use the access token to call your API
    // ...
  } catch (error) {
    // Error handling
  }
}
```

## Run the sample

### Compile and hot-reload for development

This compiles and serves the Next.js app and starts the API server on port 3001.

```bash
npm run dev
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

### Docker build

To build and run the Docker image, run `exec.sh`, or `exec.ps1` on Windows.

### Run the unit tests

```bash
npm run test
```

### Run the integration tests

```bash
npm run test:integration
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple sources](https://auth0.com/docs/identityproviders), either social identity providers such as **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce** (amongst others), or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS, or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://auth0.com/docs/connections/database/custom-db)**.
* Add support for **[linking different user accounts](https://auth0.com/docs/users/user-account-linking)** with the same user.
* Support for generating signed [JSON Web Tokens](https://auth0.com/docs/tokens/json-web-tokens) to call your APIs and **flow the user identity** securely.
* Analytics of how, when, and where users are logging in.
* Pull data from other sources and add it to the user profile through [JavaScript rules](https://auth0.com/docs/rules).

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click **Sign Up**.
2. Use Google, GitHub, or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/responsible-disclosure-policy) details the procedure for disclosing security issues.

## Author

[Auth0](https://auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](./LICENSE) file for more info.
