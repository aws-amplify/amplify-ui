/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  ignorePatterns: ['.eslintrc.cjs', 'dist'],
  overrides: [
    {
      files: ['authenticator.vue', 'index.ts'],
      rules: {
        'vue/multi-word-component-names': ['off'],
      },
    },
    {
      files: ['index.ts', 'useAuth.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['**/__tests__/**', '**/jest.*', 'vite.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    }
  ],
  parserOptions: {
    ecmaVersion: 2020,
    allowImportExportEverywhere: true,
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    // we intentionally use non-null assertion where types are inaccurate.
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/no-extraneous-dependencies': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/script-setup-uses-vars': 'error',
  },
};
