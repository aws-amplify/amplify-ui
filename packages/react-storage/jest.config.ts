import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from index, testUtils or version files
    '!<rootDir>/**/(index|version).(ts|tsx)',
    // do not collect from top level styles directory
    '!<rootDir>/src/styles/*.ts',
    // do not collect coverage of test utils
    '!<rootDir>/src/**/__testUtils__/*.(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      // TEMP REDUCE COVERAGE
      // branches: 87,
      branches: 85,
      // functions: 90,
      functions: 88,
      lines: 95,
      statements: 95,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: [
    '<rootDir>/src/components/StorageBrowser/displayText/libraries/en/__tests__/scenarios.ts',
    '__testUtils__/',
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
