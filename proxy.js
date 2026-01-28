import { auth0 } from "./lib/auth0";

export async function proxy(request) {
  /* highlight-start auth-response */
  const authResponse = await auth0.middleware(request);
  /* highlight-end auth-response */

  // Always return the auth response.
  //
  // Note: The auth response forwards requests to your app routes by default.
  // If you need to block requests, do it before calling auth0.middleware() or
  // copy the authResponse headers except for x-middleware-next to your blocking response.
  /* highlight-start auth-response */
  return authResponse;
  /* highlight-end auth-response */
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
