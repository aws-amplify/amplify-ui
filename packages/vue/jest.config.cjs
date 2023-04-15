module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|vue)'],
  coveragePathIgnorePatterns: [
    // ignore coverage for subdirectories' index files
    '<rootDir>/src/(components|composables|types)/index.ts',
    // ignore coverage for top level "export", shims-vue and version files
    '<rootDir>/src/(index|shims-vue.d|version).ts',
  ],
  coverageThreshold: {
    global: {
      branches: 28,
      functions: 20,
      lines: 45,
      statements: 44,
    },
  },
  testEnvironment: 'jsdom',
  verbose: true,
  moduleFileExtensions: ['js', 'ts', 'json', 'vue', 'tsx'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.vue$': '@vue/vue3-jest',
  },
};
