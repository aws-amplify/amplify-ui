import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    // exclude top level version.ts
    '!<rootDir>/src/version.ts',
  ],
  moduleNameMapper: {
    '^react-native$': '<rootDir>../../node_modules/react-native',
    '^uuid$': '<rootDir>/../../node_modules/uuid',
  },
  modulePaths: ['<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  forceExit: true,
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default config;
