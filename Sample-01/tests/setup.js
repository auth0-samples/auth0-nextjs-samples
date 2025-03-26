import '@testing-library/jest-dom';
import initFontAwesome from '../utils/initFontAwesome.js';

initFontAwesome();

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => ''),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn()
  })),
}));

// Define a global fetch mock
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// We're now using moduleNameMapper in package.json for Auth0 mocks
// No need to mock Auth0 here
