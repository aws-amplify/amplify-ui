/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.tsx'],
  // `aws-amplify` is external, but sub-dependencies weren't automatically externalized ("require" statements were included)
  external: ['`aws-amplify', /^@aws-amplify\//, '@aws-amplify/ui-components'],
  format: ['cjs', 'esm'],
  sourcemap: 'external',
  splitting: false,
};
