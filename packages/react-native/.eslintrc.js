module.exports = {
  env: { node: true },
  root: true,
  ignorePatterns: [
    'dist',
    '.eslintrc.js',
    'babel.config.js',
    'jest.config.js',
    'jest.setup.js',
  ],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',

    // always extend last to override previous extensions
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jest', 'react', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.spec.*', '**/*.test.*'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'jest'],
      rules: {
        'jest/unbound-method': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
  rules: {
    // typescript eslint rules either not in recommended rule set or overridden
    '@typescript-eslint/explicit-module-boundary-types': 2,
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-extra-semi': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowTernary: true },
    ],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '_', varsIgnorePattern: '_' },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',

    // eslint rules either not in recommended rule set or overridden
    'comma-dangle': ['error', 'only-multiline'],
    'function-paren-newline': 'off',
    'generator-star-spacing': 'off',
    'global-require': 'off',
    'implicit-arrow-linebreak': 'off',
    'max-params': 2,
    'no-alert': 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-tabs': ['error', { allowIndentationTabs: true }],
    'no-unused-vars': 'off', // prefer @typescript-eslint version
    'prefer-const': 'error',
    'prefer-destructuring': ['error', { array: false, object: true }],

    // jest rules either not in recommended rule set or overridden
    'jest/expect-expect': ['error', { assertFunctionNames: ['expect*'] }],
    'jest/no-mocks-import': 'off',

    // react rules either not in recommended rule set or overridden
    'react/destructuring-assignment': ['error', 'always'],
    'react/jsx-boolean-value': 'error',
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': ['error', { declaration: 'ignore' }],
    'react/no-array-index-key': 'off',
    'react/no-danger': 'error',
    'react/no-unused-prop-types': 'error',
    'react/prop-types': 'off',
    'react/static-property-placement': ['error', 'static public field'],

    // react hook rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
