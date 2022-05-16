/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  legacyOutput: true,
  sourcemap: 'external',
  splitting: false,
};
