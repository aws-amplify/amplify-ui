module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  // ignore coverage for top level "export" and style files
  coveragePathIgnorePatterns: ['<rootDir>/src/(index|styles).ts'],
  coverageThreshold: {
    global: {
      branches: 61,
      functions: 44,
      lines: 70,
      statements: 74,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
