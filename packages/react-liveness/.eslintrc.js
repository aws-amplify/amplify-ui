module.exports = {
  extends: ['amplify-ui/react'],
  // point to local tsconfig
  parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
  ignorePatterns: [
    'dist',
    '*.config.js',
    '.eslintrc.js',
    'jest.setup.ts',

    // NOTE: remove to turn on linting for test files
    '__tests__',
  ],
  overrides: [
    {
      extends: ['amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
};
