// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = [
  {
    input: ['src/index.tsx', 'src/internal.tsx', 'src/legacy.tsx'],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ declarationDir: 'dist/types' }), terser()],
  },
  {
    input: ['src/index.tsx', 'src/internal.tsx', 'src/legacy.tsx'],
    output: [
      {
        dir: 'dist/esm',
        format: 'es',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true,
      },
    ],
    plugins: [typescript({ outDir: 'dist/esm', declaration: false }), terser()],
  },
  {
    input: 'src/styles.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      assetFileNames: '[name][extname]',
    },
    plugins: [styles({ mode: ['extract'] })],
  },
];

export default config;
