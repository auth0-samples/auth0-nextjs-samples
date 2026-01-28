Configure the authentication proxy to intercept requests and handle the OAuth flow.

> **Note:** Next.js 16 renamed `middleware` to `proxy`. Create this file as `proxy.js` (or `proxy.ts`) in your project root or `src/` folder if your project uses it. If you're using Next.js 15 or earlier, name it `middleware.js` instead and rename the function to `middleware`.
