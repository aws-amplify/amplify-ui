module.exports = {
  plugins: ['react', 'react-hooks'],
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',

    // extend internal config last to ensure prettier is final loaded extension
    'amplify-ui',
  ],
  parserOptions: { ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' } },
  rules: {
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
