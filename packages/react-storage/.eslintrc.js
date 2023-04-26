module.exports = {
  extends: ['@aws-amplify/eslint-config-amplify-ui/react'],
  // point to local tsconfig
  parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
  ignorePatterns: ['dist', '*.config.js', '.eslintrc.js', 'jest.setup.ts'],
  overrides: [
    {
      extends: ['@aws-amplify/eslint-config-amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
};
