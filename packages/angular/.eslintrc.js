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
         * `prefer-nullish-coalescing` requires `strictNullChecks` to be on.
         * Turn this off until we turn `strict` on in the `tsconfig.json`.
         */
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        // making the changes for these rules leads to material changes in the package code
        '@typescript-eslint/consistent-type-exports': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',

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
    },
    {
      extends: ['@aws-amplify/amplify-ui/jest'],
      files: [
        '**/__tests__/**',
        // this file doesn't fit the typical pattern of being in a __tests__ directory
        './projects/ui-angular/src/lib/components/authenticator/components/setup-totp/setup-totp.component.spec.ts',
      ],
    },
    {
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            packageDir: ['.', '../..', './projects/ui-angular'],
          },
        ],
      },
      files: ['**/*.ts'],
    },
  ],
};
