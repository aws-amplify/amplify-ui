/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.tsx'],
  // `aws-amplify` is external, but sub-dependencies weren't automatically externalized ("require" statements were included)
  external: ['`aws-amplify', /^@aws-amplify\//],
  format: ['cjs', 'esm'],
  // ! .cjs/.mjs doesn't work with Angular's webpack4 config by default!
  legacyOutput: true,
  sourcemap: 'external',
  splitting: false,
};
