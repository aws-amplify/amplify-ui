import { Config } from 'jest';

const jestConfig: Config = {
  setupFiles: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', 'src'],
  testEnvironment: 'jsdom',
};

export default jestConfig;
