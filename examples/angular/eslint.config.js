const { defineConfig } = require('eslint/config');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {},
  {
    files: ['**/*.ts'],

    languageOptions: {
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },

    extends: compat.extends(
      'plugin:@typescript-eslint/recommended',
      'plugin:@angular-eslint/recommended',
      'plugin:@angular-eslint/template/process-inline-templates',
      '@aws-amplify/amplify-ui'
    ),

    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@angular-eslint/prefer-standalone': 'off',

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'amplify',
          style: 'camelCase',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: compat.extends('plugin:@angular-eslint/template/recommended'),
  },
  {
    extends: compat.extends('@aws-amplify/amplify-ui/jest'),

    files: [
      '**/__tests__/**',
      './projects/ui-angular/src/lib/components/authenticator/components/setup-totp/setup-totp.component.spec.ts',
    ],
  },
  {
    rules: {
      'import/no-extraneous-dependencies': [
        'off',
        {
          packageDir: ['.', '../..'],
        },
      ],
    },

    files: ['**/*.ts'],
  },
]);
