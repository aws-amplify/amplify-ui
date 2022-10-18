module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',

    // do not collect coverage from
    // - constants files
    '!<rootDir>/src/**/*(c|C)onstants.ts',
    // - primary exports file
    '!<rootDir>/src/index.ts',
    // - __mock__ directories
    '!<rootDir>/src/**/__mock__/*',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: { '^react$': '<rootDir>/node_modules/react' },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
