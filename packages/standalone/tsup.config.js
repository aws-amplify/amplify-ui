const { nodeBuiltIns } = require('esbuild-node-builtins');
const alias = require('esbuild-plugin-alias');

/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.tsx', 'src/Authenticator'],
  esbuildPlugins: [
    alias({
      react: require.resolve('react'),
      'react-dom': require.resolve('react-dom'),
    }),
    nodeBuiltIns(),
  ],
  // `aws-amplify` is external, but sub-dependencies weren't automatically externalized ("require" statements were included)
  external: ['aws-amplify'],
  format: ['cjs', 'esm'],
  // ! .cjs/.mjs doesn't work with Angular's webpack4 config by default!
  legacyOutput: true,
  sourcemap: 'external',
  splitting: false,
};
