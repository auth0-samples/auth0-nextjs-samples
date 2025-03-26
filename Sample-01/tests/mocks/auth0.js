// Mock Auth0 APIs
export const auth0 = {
  getSession: jest.fn(() => Promise.resolve({})),
  withPageAuthRequired: jest.fn(component => component),
  getAccessToken: jest.fn(() => Promise.resolve('access-token')),
};

// Client-side Auth0 mocks
export const useUser = jest.fn(() => {
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

export const Auth0Provider = ({ children }) => children;

export const withPageAuthRequired = jest.fn(component => component); 