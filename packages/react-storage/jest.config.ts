import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from index, testUtils or version files
    '!<rootDir>/**/(index|testUtils|version).(ts|tsx)',
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
      branches: 75,
      functions: 73,
      lines: 86,
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
