module.exports = {
  env: { node: true },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['eslint:recommended'],
  ignorePatterns: [
    '.eslintrc.js',
    'coverage',
    'dist',
    'node_modules',
    '__tests__',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    // prefer `typescript-eslint` rule
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
        ignoreRestSiblings: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: ['.', '../..'] },
    ],
  },
};
