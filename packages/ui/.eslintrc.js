module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', 'rollup.config.ts'],
  overrides: [
    {
      files: ['**/__tests__/**', '**/jest.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off', // prefer @typescript-eslint version
  },
};
