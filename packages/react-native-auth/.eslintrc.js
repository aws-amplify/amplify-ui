module.exports = {
  ignorePatterns: [
    '*.config.js',
    '.eslintrc.js',
    'dist',
    'jest.setup.js',
    'lib',
  ],
  extends: ['@aws-amplify/amplify-ui/react'],
  overrides: [
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
};
