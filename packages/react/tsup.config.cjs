/**
 * @type {import("tsup").Options}
 */
module.exports = {
  dts: true,
  entryPoints: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  sourcemap: 'both',
  splitting: false,
};
