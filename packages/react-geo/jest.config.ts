import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level style file
    '!<rootDir>/src/styles.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 61,
      functions: 44,
      lines: 68,
      statements: 70,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};

export default config;
