import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-node-externals';

// common config settings
const input = ['src/index.ts'];
const sourceMap = false;
const tsconfig = 'tsconfig.dist.json';

const esmOutputDir = 'dist/esm';

const config = defineConfig([
  // CJS config
  {
    input,
    output: { dir: 'dist', format: 'cjs' },
    plugins: [
      externals(),
      typescript({ declarationDir: 'dist/types', sourceMap, tsconfig }),
      terser(),
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
      terser(),
    ],
  },
]);
export default config;
