module.exports = {
  extends: ['@aws-amplify/amplify-ui/react'],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
  ignorePatterns: ['.eslintrc.js', 'dist'],
  overrides: [
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
};
