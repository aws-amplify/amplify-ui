module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level style file
    '!<rootDir>/src/styles.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 61,
      functions: 44,
      lines: 68,
      statements: 70,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    axios: '<rootDir>/../../node_modules/axios/lib/axios.js', // required because JS v5 uses ESM verison of axios
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
