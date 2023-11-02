import { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',

    // do not collect coverage from:
    // - constants files
    '!<rootDir>/src/**/*(c|C)onstants.ts',
    // - __mock__ directories
    '!<rootDir>/src/**/__mock__/*',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 89,
      functions: 87,
      lines: 90,
      statements: 90,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};

export default config;
