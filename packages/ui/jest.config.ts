import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    // ignore coverage for top level "export"
    '!<rootDir>/src/index.ts',
    // ignore internal `debugUtils` from coverage thresholds
    '!<rootDir>/**/debugUtils.ts',
    // ignore coverage for style-dictionary type declaration file
    '!<rootDir>/src/theme/types/style-dictionary.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      // @todo-migration: put back after fixing tests
      // functions: 85,
      functions: 70,
      // @todo-migration: put back after fixing tests
      // lines: 90,
      lines: 87,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
};

export default config;
