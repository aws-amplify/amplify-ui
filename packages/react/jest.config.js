module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  // ignore coverage for top level "export", PrimitiveCatalog, and style files
  coveragePathIgnorePatterns: [
    '<rootDir>/src/(index|internal|PrimitiveCatalog|styles).(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 72,
      functions: 60,
      lines: 85,
      statements: 85,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};
