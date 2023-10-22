import { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*{c,C}onstants.ts',
  ],
  moduleNameMapper: {
    '^uuid$': '<rootDir>/../../node_modules/uuid',
    '^react-native$': '<rootDir>/node_modules/react-native',
  },

  // transformIgnorePatterns: ['node_modules/(?!@?react-native)'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default config;
