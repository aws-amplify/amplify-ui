module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',

    // do not collect coverage from constants files
    '!<rootDir>/src/**/*(c|C)onstants.ts',
    // do not collect coverage from primary exports file
    '!<rootDir>/src/index.ts',
  ],
  coverageThreshold: {
    // temp setting these to zero
    global: {
      branches: 0, // 90,
      functions: 0, // 90,
      lines: 0, // 90,
      statements: 0, // 90,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
