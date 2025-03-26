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
export {
  Auth0Client
};

export const auth0 = new Auth0Client({});
export const withApiAuthRequired = (handler) => handler;
export const withPageAuthRequired = (component) => component;
export const getSession = () => Promise.resolve({
  user: {
    sub: 'user123',
    name: 'Test User',
    email: 'test@example.com'
  }
});
export const getAccessToken = () => Promise.resolve('mocked-access-token'); 