// Mock implementation for lib/auth0.ts
const auth0 = {
  getSession: jest.fn().mockResolvedValue({
    user: {
      sub: 'bob'
    }
  }),
  getAccessToken: jest.fn().mockResolvedValue({ accessToken: 'mock-access-token' }),
  withPageAuthRequired: jest.fn(page => page),
  withApiAuthRequired: jest.fn(handler => handler)
};

module.exports = {
  auth0
}; 