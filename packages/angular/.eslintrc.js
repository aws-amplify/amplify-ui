module.exports = {
  root: true,
  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        // This is required if you use inline templates in Components
        'plugin:@angular-eslint/template/process-inline-templates',
        '@aws-amplify/amplify-ui',
      ],
      rules: {
        /*
         * TODO: turn the following settings on after fixing the
         * corresponding linting issues.
         */
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        'prefer-const': 'warn',
        'prefer-destructuring': 'warn',

        /*
         * `prefer-nullish-coalescing` requires `strictNullChecks` to be on.
         * Turn this off until we turn `strict` on in the `tsconfig.json`.
         */
        '@typescript-eslint/prefer-nullish-coalescing': 'off',

        // we use `amplify-` prefix for directives.
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
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: ['**/__mocks__/**', '**/__tests__/**'],
      rules: {
        // TODO: turn these on after fixing the corresponding lint errors
        'jest/no-export': 'warn',
        'jest/unbound-method': 'warn',
      },
    },
  ],
};
