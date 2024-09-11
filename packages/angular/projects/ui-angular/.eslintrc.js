module.exports = {
  extends: '../../.eslintrc.js',
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.spec.{ts,tsx,js}', '**/*.jest.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  plugins: ['import'],
  rules: {
    'import/no-extraneous-dependencies': 'error',
  },
};
