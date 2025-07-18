/* eslint-env node */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'svelte', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  ignorePatterns: ['dist', 'node_modules', '*.cjs'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: ['.', '../..'],
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};