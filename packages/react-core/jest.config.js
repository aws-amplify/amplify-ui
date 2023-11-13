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
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    axios: '<rootDir>/../../node_modules/axios/lib/axios.js', // required because JS v5 uses ESM verison of axios
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
