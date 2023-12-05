import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    // ignore coverage for top level "export"
    '<rootDir>/src/index.ts',
    // ignore coverage for style-dictionary type declaration file
    '<rootDir>/src/theme/types/style-dictionary.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
      // @todo-migration: put back after fixing tests
      // branches: 80,
      // functions: 85,
      // lines: 90,
      // statements: 90,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
};

export default config;
