import { defineConfig, globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import pluginImport from 'eslint-plugin-import-x';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs['flat/essential'],
    ],

    plugins: {
      import: pluginImport,
    },

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        allowImportExportEverywhere: true,
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },

    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        { packageDir: ['.', '../..'] },
      ],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
  },
  globalIgnores([
    '**/eslint.config.js',
    '**/.lintstagedrc.cjs',
    '**/rollup.config.mjs',
    '**/coverage',
    '**/dist',
    '**/node_modules',
    '**/__tests__',
  ]),
  {
    files: ['**/authenticator.vue', '**/index.ts'],
    rules: {
      'vue/multi-word-component-names': ['off'],
    },
  },
  {
    files: ['**/index.ts', '**/useAuth.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]);
