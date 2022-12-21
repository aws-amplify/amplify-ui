// TODO remove these once the full set of rules can be turned on for the repo
// extensions that should be ran against the entire repo
const sharedExtensions = [
  'plugin:react-hooks/recommended',

  // always extend last to override previous extensions
  'prettier',
];

// rules that should be ran against the entire repo
const sharedRules = {
  // react hook rules
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',
};

module.exports = {
  env: { node: true },
  root: true,
  ignorePatterns: [
    // top level directories
    '__tests__',
    'dist',
    'node_modules',
    'scripts',

    // config files
    '.eslintrc.js',
    'jest.config.js',
    'jest.setup.ts',
    'rollup.config.js',
    'tsup.config.ts',

    // TODO remove once the full set of rules can be turned on for the repo
    'src/react-shim.js',
  ],
  extends: sharedExtensions,
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
    // TODO remove once the full set of rules can be turned on for the repo
    // To keep the rules-of-hooks on for the entire ui-react package while
    // we add the larger set of rules incrementally, use an overrides object
    // to incrementally apply the new rules
    {
      files: [
        // TODO Uncomment the below lines on an individual basis as the updates to pass linting are completed.
        // If needed, these can be broken down further, e.g. 'src/primitives/Alert/**/*'
        'src/components/**/*',
        'src/helpers/**/*',
        'src/hooks/**/*',
        'src/primitives/+(shared|utils|A*|B*|C*|D*|E*|F*|G*|H*|I*|J*|K*|L*|M*)/**/*',
        'src/studio',
        // 'src/primitives/**/*',
      ],
      extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        // extend last to override previous extensions
        ...sharedExtensions,
      ],
      plugins: ['@typescript-eslint', 'jest', 'react', 'react-hooks'],
      settings: {
        react: {
          version: 'detect',
        },
      },
      rules: {
        ...sharedRules,

        // typescript eslint rules either not in recommended rule set or overridden
        '@typescript-eslint/explicit-module-boundary-types': 2,
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-extra-semi': 'error',
        '@typescript-eslint/no-floating-promises': ['off'],
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowTernary: true },
        ],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '_', varsIgnorePattern: '_' },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/restrict-template-expressions': ['off'],
        '@typescript-eslint/unbound-method': 'error',

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
        'react/jsx-no-constructed-context-values': ['error'],
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': ['error', { declaration: 'ignore' }],
        'react/no-array-index-key': 'off',
        'react/no-danger': ['error'],
        'react/no-unused-prop-types': ['error'],
        'react/prop-types': 'off',
        'react/static-property-placement': ['error', 'static public field'],
      },
    },
  ],

  rules: sharedRules,
};
