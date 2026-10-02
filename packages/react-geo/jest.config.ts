import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level style file
    '!<rootDir>/src/styles.ts',
    '!<rootDir>/src/__mocks__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 61,
      functions: 44,
      lines: 68,
      statements: 70,
    },
  },
  moduleNameMapper: {
    '^maplibre-gl$': '<rootDir>/src/__mocks__/maplibre-gl.ts',
    '^uuid$': '<rootDir>/../../node_modules/uuid',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
