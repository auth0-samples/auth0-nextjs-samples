The proxy layer automatically mounts these authentication routes:

- `/auth/login` - Redirects to Auth0 login page
- `/auth/logout` - Logs out the user
- `/auth/callback` - Handles the OAuth callback
- `/auth/profile` - Returns the user profile as JSON
- `/auth/access-token` - Returns the access token
- `/auth/backchannel-logout` - Receives a logout_token when a configured Back-Channel Logout initiator occurs
