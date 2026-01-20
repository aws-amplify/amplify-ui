import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    // ignore coverage for top level "export"
    '!<rootDir>/src/index.ts',
    // ignore internal `debugUtils` from coverage thresholds
    '!<rootDir>/**/debugUtils.ts',
  ],
  coverageThreshold: {
    global: {
      // @todo-passwordless: Restore to 80 after increasing coverage for passwordless flows
      branches: 77,
      // @todo-migration: put back after fixing tests
      // functions: 85,
      functions: 70,
      // @todo-migration: put back after fixing tests
      // lines: 90,
      lines: 87,
      // @todo-passwordless: Restore to 90 after increasing coverage for passwordless flows
      statements: 87,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
};

export default config;
