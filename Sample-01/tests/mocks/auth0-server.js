// Mock for Auth0's server components
class Auth0Client {
  constructor(options) {
    this.options = options;
  }

  getAccessToken() {
    return Promise.resolve('mocked-access-token');
  }

  getSession() {
    return Promise.resolve({
      user: {
        sub: 'user123',
        name: 'Test User',
        email: 'test@example.com'
      }
    });
  }
}

// Export for server components and API routes
module.exports = {
  Auth0Client,
  auth0: new Auth0Client({}),
  withApiAuthRequired: (handler) => handler,
  withPageAuthRequired: (component) => component,
  getSession: () => Promise.resolve({
    user: {
      sub: 'user123',
      name: 'Test User',
      email: 'test@example.com'
    }
  }),
  getAccessToken: () => Promise.resolve('mocked-access-token')
}; 