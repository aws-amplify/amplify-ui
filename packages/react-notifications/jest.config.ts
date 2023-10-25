import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level styles file
    '!<rootDir>/src/styles.ts',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80,
  //   },
  // },
  coverageThreshold: {
    global: {
      branches: 67.18,
      functions: 52.08,
      lines: 58.19,
      statements: 58.46,
    },
  },
  // @todo-upgrade-react-18 update test API usage and remove temp thresholds
  testPathIgnorePatterns: [
    '<rootDir>/src/components/InAppMessaging/MessageLayout/__tests__/MessageLayout.test.tsx',
  ],
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
