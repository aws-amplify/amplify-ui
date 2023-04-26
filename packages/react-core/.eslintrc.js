module.exports = {
  extends: '@aws-amplify/eslint-config-amplify-ui/react',
  ignorePatterns: ['dist', '.eslintrc.js', '*.config.js'],
  parserOptions: { project: ['./tsconfig.json'], tsconfigRootDir: __dirname },
  overrides: [
    {
      extends: '@aws-amplify/eslint-config-amplify-ui/jest',
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
};
