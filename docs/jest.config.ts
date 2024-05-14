import { Config } from 'jest';

const jestConfig: Config = {
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
