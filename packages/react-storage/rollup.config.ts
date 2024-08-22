import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';
import externals from 'rollup-plugin-node-externals';

// common config settings
const input = ['src/index.ts'];
const sourceMap = false;
const tsconfig = 'tsconfig.dist.json';

// storage browser settings
const storageBrowserInput = 'src/components/StorageBrowser/index.ts';
const storageBrowserOutputEntryFile = 'create-storage-browser.js';

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
    ],
  },
  {
    input: storageBrowserInput,
    output: {
      dir: 'dist',
      entryFileNames: storageBrowserOutputEntryFile,
      format: 'cjs',
    },
    plugins: [
      externals({ include: /^@aws-amplify/ }),
      typescript({ declarationDir: 'dist/types', sourceMap, tsconfig }),
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
    ],
  },
  // CSS config
  {
    input: 'src/styles/styles.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      assetFileNames: '[name][extname]',
    },
    plugins: [styles({ mode: ['extract'] })],
  },
  {
    input: 'src/styles/storage-browser-styles.ts',
    output: {
      dir: 'dist',
      format: 'cjs',
      assetFileNames: '[name][extname]',
    },
    plugins: [styles({ mode: ['extract'] })],
  },
]);

export default config;
