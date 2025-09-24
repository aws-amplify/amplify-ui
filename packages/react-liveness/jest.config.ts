import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
    // do not collect from test utilities and mocks
    '!<rootDir>/src/**/__mocks__/**/*.(ts|tsx)',
    '!<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 81,
      functions: 84,
      lines: 88,
      statements: 88,
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
    url: 'http://localhost',
  },
};

export default config;
