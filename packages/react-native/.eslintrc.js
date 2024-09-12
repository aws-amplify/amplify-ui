module.exports = {
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'dist', 'lib'],
  extends: ['@aws-amplify/amplify-ui/react'],
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
