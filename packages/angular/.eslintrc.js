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
      files: ['**/__mocks__/**', '**/__tests__/**'],
    },
  ],
};
