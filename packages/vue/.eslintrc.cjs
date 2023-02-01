/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    allowImportExportEverywhere: true,
    sourceType: 'module',
  },
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },

  ignorePatterns: ['useUtils.ts'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/script-setup-uses-vars': 'error',
  },
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
  ],
};
