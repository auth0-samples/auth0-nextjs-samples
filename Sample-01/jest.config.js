export default {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "app"
  ],
  resetMocks: false,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Handle CSS imports (we don't need the actual CSS)
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Server-side Auth0 module mock
    "@auth0/nextjs-auth0": "<rootDir>/tests/mocks/auth0.js",
    // Server-side Auth0 module mock (specific)
    "@auth0/nextjs-auth0/server": "<rootDir>/tests/mocks/auth0-server.js",
    // Client-side Auth0 module mock 
    "@auth0/nextjs-auth0/client": "<rootDir>/tests/mocks/auth0.js",
    // Workaround to resolve hook imports in tests
    "hooks/(.*)": "<rootDir>/hooks/$1",
    // Mock lib/auth0.ts
    "lib/auth0": "<rootDir>/tests/mocks/auth0-server.js"
  },
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { 
        configFile: "./.babelrc" 
      }
    ]
  },
  transformIgnorePatterns: [
    "/node_modules/(?!highlight\\.js)"
  ]
}; 