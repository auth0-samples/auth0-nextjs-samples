// Mock Auth0 APIs
const auth0 = {
  getSession: jest.fn(() => Promise.resolve({})),
  withPageAuthRequired: jest.fn(component => component),
  getAccessToken: jest.fn(() => Promise.resolve('access-token')),
};

// Client-side Auth0 mocks
const useUser = jest.fn(() => {
  return {
    user: { 
      name: 'Test User',
      email: 'test@example.com',
      picture: 'https://example.com/picture.jpg'
    },
    isLoading: false,
    error: null
  };
});

const Auth0Provider = ({ children }) => children;

const withPageAuthRequired = jest.fn(component => component);

module.exports = {
  auth0,
  useUser,
  Auth0Provider,
  withPageAuthRequired
}; 