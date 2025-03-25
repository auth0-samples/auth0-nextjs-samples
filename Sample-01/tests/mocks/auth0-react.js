// Mock implementation for Auth0Provider component 
const React = require('react');

const Auth0Provider = (props) => {
  // Simply render the children
  return React.createElement(React.Fragment, null, props.children);
};

const useUser = jest.fn().mockReturnValue({
  user: { name: 'Test User', email: 'test@example.com' },
  isLoading: false,
  checkSession: jest.fn(),
  error: null
});

module.exports = {
  Auth0Provider,
  useUser
}; 