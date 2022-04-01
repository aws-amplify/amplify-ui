// rollup.config.js
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const config = defineConfig([
  // CJS config
  {
    input: ['src/index.ts'],
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
    },
    external: (id) => /style-dictionary/.test(id),
    plugins: [
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
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
    },
    external: (id) => /style-dictionary/.test(id),
    plugins: [
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
