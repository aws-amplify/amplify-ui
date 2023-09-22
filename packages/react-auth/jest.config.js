module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
  ],
  // ignore coverage for top level "export", version and style files
  coveragePathIgnorePatterns: ['<rootDir>/src/(index|styles|version).(ts|tsx)'],
  coverageThreshold: {
    global: {
      // TBD
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
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
