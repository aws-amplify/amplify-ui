module.exports = {
  extends: ['@aws-amplify/amplify-ui/react'],
  ignorePatterns: ['.eslintrc.js', 'dist', 'lib'],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
  overrides: [
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
};
