module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
