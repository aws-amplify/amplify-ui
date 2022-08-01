module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  // ignore coverage for top level "export", PrimitiveCatalog, and style files
  coveragePathIgnorePatterns: [
    '<rootDir>/src/(index|internal|legacy|PrimitiveCatalog|styles).(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 71,
      functions: 60,
      lines: 79,
      statements: 79,
    },
  },
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
};
