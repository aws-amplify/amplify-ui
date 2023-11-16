module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    axios: '<rootDir>/../../node_modules/axios/lib/axios.js', // required because JS v5 uses ESM version of axios
  },
};
