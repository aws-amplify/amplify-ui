import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 81,
      functions: 85,
      lines: 89,
      statements: 89,
    },
  },
  testPathIgnorePatterns: [],
  moduleNameMapper: {
    '^nanoid$': '<rootDir>/../../node_modules/nanoid',
    '^uuid$': '<rootDir>/../../node_modules/uuid',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    // `@aws-sdk/core` >= 3.974 maps its `./client` submodule `browser` condition
    // to an ESM-only build that jest cannot parse. Resolve `node` first so the
    // CJS build is used, matching how these tests resolved the SDK previously.
    customExportConditions: ['node'],
  },
};

export default config;
