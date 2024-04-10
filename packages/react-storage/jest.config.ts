import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
    // TODO remove once StorageManager is updated
    '!**/StorageManager/**',
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 88,
      lines: 93,
      statements: 93,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  // TODO remove once StorageManager is updated
  testPathIgnorePatterns: ['/StorageManager/'],
};

export default config;
