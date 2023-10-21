import { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/**/*{c,C}onstants.ts',
  ],
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    '^react-native$': '<rootDir>/node_modules/react-native',
  },
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default config;
