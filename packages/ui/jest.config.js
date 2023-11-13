module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  coveragePathIgnorePatterns: [
    // ignore coverage for top level "export"
    '<rootDir>/src/index.ts',
    // ignore coverage for style-dictionary type declaration file
    '<rootDir>/src/theme/types/style-dictionary.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 90,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    axios: '<rootDir>/../../node_modules/axios/lib/axios.js', // required because JS v5 uses ESM verison of axios
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
