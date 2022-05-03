module.exports = {
  env: { node: true },
  root: true,
  ignorePatterns: [
    '.eslintrc.js',
    'jest.config.js',
    'tsup.config.ts',
    'scripts',
    'dist',
    'node_modules',

    // TODO Delete this file once the above directories are no longer ignored
    'src/react-shim.js',

    // TODO remove once the icons have been deprecated for v3
    'src/primitives/Icon/icons',
  ],
  extends: ['plugin:react-hooks/recommended'],
  plugins: ['react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.spec.*', '**/*.test.*'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.dev.json'],
      },
      plugins: ['@typescript-eslint', 'jest'],
      rules: {
        // Turn the original rule off for test files, turn on the jest rule
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
      },
    },
    // TODO remove once the larger set of rules is applied to the whole repo.
    // To keep the rules-of-hooks on for the entire ui-react package while
    // we add the larger set of rules incrementally, use an overrides object
    // to incrementally apply the new rules
    {
      files: [
        // TODO Uncomment the below lines on an individual basis as the updates to pass linting are completed.
        // If needed, these can be broken down further, e.g. 'src/components/Geo/**/*'
        'src/helpers/**/*',
        // 'src/components/**/*',
        // 'src/hooks/**/*',
        // 'src/primitives/**/*',
      ],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
      ],
      plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'jest',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 2,
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowTernary: true },
        ],
        '@typescript-eslint/no-floating-promises': ['off'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '_', varsIgnorePattern: '_' },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/restrict-template-expressions': ['off'],
        '@typescript-eslint/unbound-method': 'error',
        'comma-dangle': ['error', 'only-multiline'],
        'function-paren-newline': 'off',
        'generator-star-spacing': 'off',
        'global-require': 'off',
        'implicit-arrow-linebreak': 'off',
        'import/no-cycle': 'off',
        'import/no-extraneous-dependencies': ['off'],
        'import/prefer-default-export': 'off',
        'jest/expect-expect': ['error', { assertFunctionNames: ['expect*'] }],
        'jest/no-mocks-import': 'off',
        'max-params': 2,
        'no-alert': 'error',
        'no-console': 'error',
        'no-tabs': ['error', { allowIndentationTabs: true }],
        'prefer-destructuring': ['error', { array: false, object: true }],
        'prettier/prettier': ['error'],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': ['error', { declaration: 'ignore' }],
        'react/no-array-index-key': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': [
          2,
          { ignoreFunctionalComponents: true },
        ],
        'react/static-property-placement': ['error', 'static public field'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
  ],

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
