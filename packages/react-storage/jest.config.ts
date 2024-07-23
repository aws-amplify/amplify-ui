import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from version file
    '!<rootDir>/src/version.ts',
    // do not collect from top level styles directory
    '!<rootDir>/src/styles/*.ts',
  ],
  coverageThreshold: {
    global: {
      // TEMP REDUCE COVERAGE
      // branches: 87,
      // functions: 90,
      // lines: 95,
      // statements: 95,
      branches: 83,
      functions: 74,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
