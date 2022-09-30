module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',

    // do not collect coverage from constants files
    '!<rootDir>/src/**/*(c|C)onstants.ts',
    // do not collect coverage from primary exports file
    '!<rootDir>/src/index.ts',
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
