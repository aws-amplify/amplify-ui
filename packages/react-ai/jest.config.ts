import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/ai-conversation-styles.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 68,
      functions: 79,
      lines: 88,
      statements: 87,
    },
  },
  testPathIgnorePatterns: [],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
