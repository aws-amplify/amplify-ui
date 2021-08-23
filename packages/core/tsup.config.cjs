/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: 'external',
  splitting: false,
};
