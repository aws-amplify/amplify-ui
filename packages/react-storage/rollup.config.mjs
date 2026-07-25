import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import styles from 'rollup-plugin-styles';
import externals from 'rollup-plugin-node-externals';

// common config settings
const input = {
  index: 'src/index.ts',
  browser: 'src/components/StorageBrowser/index.ts',
};
const sourceMap = false;
const tsconfig = 'tsconfig.dist.json';

/**
 * @type {import('rollup').OutputOptions}
 */
const cjsOutput = {
  dir: 'dist',
  esModule: true,
  format: 'cjs',
  generatedCode: { reservedNamesAsProps: false },
  interop: 'auto',
};

const config = defineConfig([
  // CJS config
  {
    input,
    output: cjsOutput,
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
  // Service Worker — standalone IIFE, no externals, self-contained
  {
    input: 'src/components/StorageBrowser/service-worker/download-sw.ts',
    output: {
      file: 'dist/download-sw.js',
      format: 'iife',
    },
    plugins: [
      typescript({
        declaration: false,
        sourceMap: false,
        tsconfig: 'tsconfig.sw.json',
      }),
    ],
  },
]);

export default config;
