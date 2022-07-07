module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    'react-dom/server': '<rootDir>/node_modules/react-dom/server.browser.js',
  },
  setupFiles: ['./jest.setup.js'],
};
