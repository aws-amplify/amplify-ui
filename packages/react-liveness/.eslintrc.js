module.exports = {
  extends: ['@aws-amplify/amplify-ui/react'],
  ignorePatterns: [
    '.eslintrc.js',
    'dist',
    'rollup.config.ts',
    // NOTE: remove to turn on linting for test files
    '__tests__',
  ],
  overrides: [
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
    {
      files: ['**/__tests__/**', '**/__mocks__/**', '**/jest.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': 'error',
  },
};
