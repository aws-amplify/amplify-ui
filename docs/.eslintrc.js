module.exports = {
  extends: ['next/core-web-vitals', 'amplify-ui/react'],
  rules: {
    // Doesn't apply to nextJS
    'react/react-in-jsx-scope': 'off',
    'no-alert': 'off', // We use Alert in example code

    // @TODO Fix these:
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/jsx-boolean-value': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/await-thenable': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'react/jsx-no-useless-fragment': 0,
    'react/destructuring-assignment': 0,
    'no-console': 0,

    // This rule requires the `strictNullChecks` compiler option to be turned on to function correctly
    '@typescript-eslint/prefer-nullish-coalescing': 0,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['dist', '*.config.js', '.eslintrc.js', 'jest.config.ts'],
};
