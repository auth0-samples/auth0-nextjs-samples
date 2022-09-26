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
  const originalModule = jest.requireActual('@auth0/nextjs-auth0');

  return {
    ...originalModule,
    getAccessToken: () => 'access_token',
    withApiAuthRequired: handler => handler,
    withPageAuthRequired: page => () => page()
  };
});
