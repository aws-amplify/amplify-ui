// rollup.config.js
import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import externals from 'rollup-plugin-node-externals';

const config = defineConfig([
  // CJS config
  {
    input: ['src/index.tsx', 'src/internal.tsx'],
    output: {
      dir: 'dist',
      format: 'cjs',
      sourcemap: false,
    },
    plugins: [
      commonjs(),
      externals({ include: /^@aws-amplify/ }),
      typescript({ declarationDir: 'dist/types', sourceMap: false }),
      terser(),
    ],
  },
  // ESM config
  {
    input: ['src/index.tsx', 'src/internal.tsx'],
    output: {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: false,
    },
    plugins: [
      commonjs(),
      externals({ include: /^@aws-amplify/ }),
      typescript({ outDir: 'dist/esm', declaration: false, sourceMap: false }),
      terser(),
    ],
  },
  // CSS config
  {
    input: 'src/styles.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      assetFileNames: '[name][extname]',
    },
    plugins: [styles({ mode: ['extract'] })],
  },
]);

export default config;
