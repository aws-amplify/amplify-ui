module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/projects/ui-angular/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    // ignore coverage for top level "export", jest setup, version files
    '<rootDir>/projects/ui-angular/src/(index|setup.jest|version).ts',
  ],
  coverageThreshold: {
    global: {
      branches: 8,
      functions: 12,
      lines: 28,
      statements: 29,
    },
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/projects/ui-angular/src/setup.jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['node_modules/(?!.*.(mjs|ts)$)'],
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
};
