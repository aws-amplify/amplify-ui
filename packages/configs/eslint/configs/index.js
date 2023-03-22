module.exports = {
  env: { node: true },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // always extend last to override previous extensions
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
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
  },
};
