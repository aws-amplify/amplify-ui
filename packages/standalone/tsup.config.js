const alias = require('esbuild-plugin-alias');

/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.ts'],
  esbuildPlugins: [
    alias({
      react: require.resolve('preact/compat'),
      'react-dom': require.resolve('preact/compat'),
      'react-dom/test-utils': require.resolve('preact/test-utils'),
      'react/jsx-runtime': require.resolve('preact/jsx-runtime'),
    }),
  ],
  // `aws-amplify` is external, but sub-dependencies weren't automatically externalized ("require" statements were included)
  external: ['`aws-amplify', /^@aws-amplify\/(core|auth)/],
  format: ['cjs', 'esm'],
  // ! .cjs/.mjs doesn't work with Angular's webpack4 config by default!
  legacyOutput: true,
  sourcemap: 'external',
  splitting: false,
};
