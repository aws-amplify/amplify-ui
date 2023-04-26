module.exports = {
  ignorePatterns: ['dist', '.eslintrc.js', '*.config.js', 'jest.setup.js'],
  extends: ['@aws-amplify/eslint-config-amplify-ui/react'],
  overrides: [
    {
      extends: ['@aws-amplify/eslint-config-amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
  // point to local tsconfig
  parserOptions: { project: ['tsconfig.json'], tsconfigRootDir: __dirname },
};
