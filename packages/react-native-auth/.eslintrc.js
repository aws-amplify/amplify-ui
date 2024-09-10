module.exports = {
  extends: ['@aws-amplify/amplify-ui/react'],
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'dist', 'lib'],
  overrides: [
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': 'error',
  },
};
