const { defineConfig, globalIgnores } = require('eslint/config');
const tsParser = require('@typescript-eslint/parser');
const tseslint = require('typescript-eslint');
const js = require('@eslint/js');

module.exports = defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      globals: {
        __DEV__: 'readonly',
        fetch: 'readonly',
        FormData: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        alert: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-shadow': ['error'],
      'no-shadow': 'off',
      'no-undef': 'off',
    },
  },
  globalIgnores([
    '**/node_modules',
    '**/ios',
    '**/android',
    '**/.expo',
    '**/babel.config.js',
    '**/eslint.config.js',
    '**/metro.config.js',
  ]),
]);
