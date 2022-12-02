import '@testing-library/jest-dom/extend-expect';

import initFontAwesome from '../utils/initFontAwesome';

initFontAwesome();

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.resetModules();
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/'
  })
}));

jest.mock('@auth0/nextjs-auth0', () => {
  return {
    getAccessToken: () => 'access_token',
    withApiAuthRequired: handler => handler,
    withPageAuthRequired: page => () => page()
  };
});
