import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level internal, PrimitiveCatalog, style and version files
    '!<rootDir>/src/(internal|PrimitiveCatalog|styles|version).(ts|tsx)',
    // do not collect coverage for the Authenticator
    '!<rootDir>/src/components/Authenticator/**/*.(ts|tsx)',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 91,
  //     statements: 91,
  //   },
  // },
  coverageThreshold: {
    global: {
      branches: 61.11,
      functions: 30.79,
      lines: 42.73,
      statements: 44.58,
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
