import '@testing-library/jest-dom/extend-expect';

import initFontAwesome from '../utils/initFontAwesome';
import { mockUser } from './fixtures';

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
    __esModule: true,
    ...originalModule,
    initAuth0: () => ({
      withPageAuthRequired: page => () => page()
    }),
    withPageAuthRequired: page => () => page(),
    useUser: () => ({ user: mockUser, isLoading: false })
  };
});
