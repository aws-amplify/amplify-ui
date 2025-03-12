import { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|vue)',
    // ignore ___mock__ directories
    '!<rootDir>/**/__mock__/*',
  ],
  coveragePathIgnorePatterns: [
    // ignore coverage for subdirectories' index files
    '<rootDir>/src/(components|composables|types)/index.ts',
    // ignore coverage for top level "export", shims-vue and version files
    '<rootDir>/src/(index|shims-vue.d|version).ts',
  ],
  coverageThreshold: {
    global: {
      branches: 89,
      functions: 90,
      lines: 93,
      statements: 93,
    },
  },
  testEnvironment: 'jsdom',
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'vue'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
    '^nanoid$': '<rootDir>/../../node_modules/nanoid',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^./src/components/(.*)$': '<rootDir>/src/components/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/.rollup.cache/'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|vue)$',
};

export default config;
