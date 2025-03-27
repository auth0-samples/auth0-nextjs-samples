import '@testing-library/jest-dom';
import { vi } from 'vitest';

import initFontAwesome from '../utils/initFontAwesome';

initFontAwesome();

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

vi.mock('next/navigation', () => ({
  usePathname: () => ''
}));

vi.mock('@auth0/nextjs-auth0', () => {
  return {
    getSession: () => ({
      user: {
        sub: 'bob'
      }
    }),
    getAccessToken: () => 'access_token',
    withApiAuthRequired: handler => handler,
    withPageAuthRequired: page => () => page()
  };
});
