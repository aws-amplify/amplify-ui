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
        '../configs/eslint/configs/index.js',
      ],
      rules: {
        // based on https://angular.io/guide/styleguide#member-sequence
        // TODO: turn the following settings on and fix linting issues
        '@typescript-eslint/member-ordering': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-assignment': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
        'prefer-const': 'warn',
        'prefer-destructuring': 'warn',
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
  ],
};
