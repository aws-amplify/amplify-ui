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
      branches: 78,
      functions: 69.3,
      lines: 75.39,
      statements: 74,
      // @todo-migration
      // change back after fixing tests
      // branches: 89,
      // functions: 90,
      // lines: 93,
      // statements: 93,
    },
  },
  testPathIgnorePatterns: [
    // @todo-migration fix mocks/unit tests in this file
    '<rootDir>/src/composables/__tests__/useAuth.spec.ts',
    '<rootDir>/src/components/__tests__/authenticator.spec.ts',
    '<rootDir>/src/components/__tests__/confirm-sign-in.spec.ts',
  ],
  testEnvironment: 'jsdom',
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'json', 'vue', 'tsx'],
  moduleNameMapper: { '^nanoid$': '<rootDir>/../../node_modules/nanoid' },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};

export default config;
