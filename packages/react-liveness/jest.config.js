module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(ts|tsx)',
    // do not collect from export files
    '!<rootDir>/**/index.(ts|tsx)',
    // do not collect from top level version and styles files
    '!<rootDir>/src/(styles|version).(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 83,
      lines: 89,
      statements: 89,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coveragePathIgnorePatterns: [
    'node_modules',
    '<rootDir>/src/components/FaceLivenessDetector/service/utils/CustomWebSocketFetchHandler.ts',
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};
