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

vi.mock('./../lib/auth0', () => {
  return {
    auth0: {
      getSession: () => ({
        user: {
          sub: 'bob'
        }
      }),
      getAccessToken: () => 'access_token',
    }
  };
});