// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: ['src/index.ts'],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    external: (id) => /style-dictionary/.test(id),
    plugins: [typescript({ declarationDir: 'dist/types' }), terser()],
  },
  {
    input: ['src/index.ts'],
    output: [
      {
        dir: 'dist/esm',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    external: (id) => /style-dictionary/.test(id),
    plugins: [
      typescript({
        outDir: 'dist/esm',
        declaration: false,
        // declarationDir: 'dist/esm',
      }),
      terser(),
    ],
  },
];
export default config;
