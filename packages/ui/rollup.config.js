// rollup.config.js
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-node-externals';

const config = defineConfig([
  // CJS config
  {
    input: ['src/index.ts'],
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
    },
    plugins: [
      externals(),
      typescript({ declarationDir: 'dist/types', sourceMap: false }),
      terser(),
    ],
  },
  // ESM config
  {
    input: ['src/index.ts'],
    output: {
      dir: 'dist/esm',
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
    },
    plugins: [
      externals(),
      typescript({
        outDir: 'dist/esm',
        declaration: false,
        sourceMap: false,
      }),
      terser(),
    ],
  },
]);
export default config;
