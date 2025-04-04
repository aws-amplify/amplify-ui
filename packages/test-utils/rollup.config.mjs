import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-node-externals';

const input = { 'storage-browser': 'src/storage-browser/index.ts' };

const sourceMap = false;
const tsconfig = 'tsconfig.dist.json';
const esmOutputDir = 'dist/esm';

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
      externals(),
      typescript({ declarationDir: 'dist/types', sourceMap, tsconfig }),
      // typescript({ declarationDir: 'dist/types', sourceMap, tsconfig }),
    ],
  },
  // ESM config
  {
    input,
    output: {
      dir: esmOutputDir,
      format: 'es',
      entryFileNames: '[name].mjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      externals(),
      typescript({
        outDir: esmOutputDir,
        declaration: false,
        sourceMap,
        tsconfig,
      }),
    ],
  },
]);

export default config;
