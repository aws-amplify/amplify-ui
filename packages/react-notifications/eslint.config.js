const { defineConfig, globalIgnores } = require('eslint/config');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    extends: compat.extends('@aws-amplify/amplify-ui/react'),

    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  globalIgnores([
    '**/eslint.config.js',
    '**/rollup.config.mjs',
    '**/.lintstagedrc.js',
    '**/coverage',
    '**/dist',
    '**/node_modules',
  ]),
  {
    extends: compat.extends('@aws-amplify/amplify-ui/jest'),
    files: ['**/__mocks__/**', '**/__tests__/**'],
  },
  {
    files: ['**/*.mjs'],
  },
]);
