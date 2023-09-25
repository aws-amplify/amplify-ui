module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',

    // do not collect coverage from:
    // - constants files
    '!<rootDir>/src/**/*(c|C)onstants.ts',
    // - __mock__ directories
    '!<rootDir>/src/**/__mock__/*',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
  ],
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
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: { '^react$': '<rootDir>/node_modules/react' },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
