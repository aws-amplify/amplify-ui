module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.(ts|tsx)'],
  // ignore coverage for top level "export", PrimitiveCatalog, and style files
  coveragePathIgnorePatterns: [
    '<rootDir>/src/(index|internal|PrimitiveCatalog|styles).(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 70,
      lines: 91,
      statements: 91,
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
