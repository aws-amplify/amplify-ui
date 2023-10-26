import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
  ],
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 82,
  //     lines: 89,
  //     statements: 89,
  //   },
  // },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 74.87,
      lines: 84.57,
      statements: 84.75,
    },
  },
  // @todo-upgrade-react-18 update test API usage and remove temp thresholds
  testPathIgnorePatterns: [
    'src/components/FaceLivenessDetector/StartLiveness/__tests__/StartLiveness.test.tsx',
    'src/components/FaceLivenessDetector/shared/__tests__/CancelButton.test.tsx',
    'src/components/FaceLivenessDetector/shared/__tests__/LivenessIconWithPopover.test.tsx',
  ],
  moduleNameMapper: {
    '^nanoid$': '<rootDir>/../../node_modules/nanoid',
    '^uuid$': '<rootDir>/../../node_modules/uuid',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};

export default config;
