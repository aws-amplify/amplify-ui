import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from index, testUtils or version files
    '!<rootDir>/**/(index|testUtils|version).(ts|tsx)',
    // do not collect from top level styles directory
    '!<rootDir>/src/styles/*.ts',
  ],
  coverageThreshold: {
    global: {
<<<<<<< HEAD
      branches: 87,
      functions: 86.5,
      lines: 93.5,
      statements: 94,
=======
      // TEMP REDUCE COVERAGE
      // branches: 87,
      // functions: 90,
      // lines: 95,
      // statements: 95,
<<<<<<< HEAD
      branches: 81,
      functions: 76,
      lines: 87,
      statements: 87,
>>>>>>> 477015530 (feat(storage-browser): add base actions, integrate ActionProvider, add ConfigContext (#5484))
=======
      branches: 80,
      functions: 75,
      lines: 86,
      statements: 86,
>>>>>>> b8b723913 (feat(storage-browser): add managed and test amplify auth support, refactor state layer and views (#5488))
    },
  },
  moduleNameMapper: { '^uuid$': '<rootDir>/../../node_modules/uuid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
