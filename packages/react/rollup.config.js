import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import externals from 'rollup-plugin-node-externals';

// common config settings
const input = ['src/index.ts', 'src/internal.ts'];
const sourceMap = false;
const tsconfig = 'tsconfig.dist.json';

const config = defineConfig([
  // CJS config
  {
    input,
    output: {
      dir: 'dist',
      format: 'cjs',
    },
    plugins: [
      externals({ include: /^@aws-amplify/ }),
      typescript({ declarationDir: 'dist/types', sourceMap, tsconfig }),
      terser(),
    ],
  },
  // ESM config
  {
    input,
    output: {
      dir: 'dist/esm',
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      externals({ include: /^@aws-amplify/ }),
      typescript({
        outDir: 'dist/esm',
        declaration: false,
        sourceMap,
        tsconfig,
      }),
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
