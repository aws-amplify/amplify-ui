// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  // CJS config
  {
    input: ['src/index.ts'],
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
    external: (id) => /style-dictionary/.test(id),
    plugins: [typescript({ declarationDir: 'dist/types' }), terser()],
  },
  // ESM config
  {
    input: ['src/index.ts'],
    output: {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
    },
    external: (id) => /style-dictionary/.test(id),
    plugins: [
      typescript({
        outDir: 'dist/esm',
        declaration: false,
      }),
      terser(),
    ],
  },
];
export default config;
