import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
    // TODO remove StorageManager from ignorePatterns when types are fixed
    '!**/StorageManager/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 87,
      lines: 93,
      statements: 93,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  // TODO remove StorageManager from ignorePatterns when types are fixed
  testPathIgnorePatterns: ['/StorageManager/'],
};

export default config;
