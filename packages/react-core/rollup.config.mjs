import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import externals from 'rollup-plugin-node-externals';

// common config settings

// { OUTPUT_PATH: INPUT_PATH }
const input = { index: 'src/index.ts', elements: 'src/elements/index.ts' };
const sourceMap = false;
const tsconfig = 'tsconfig.dist.json';

const esmOutputDir = 'dist/esm';

const config = defineConfig([
  // CJS config
  {
    input,
    output: { dir: 'dist', esModule: true, format: 'cjs' },
    plugins: [
      externals({ include: /^@aws-amplify/ }),
      typescript({ declarationDir: 'dist/types', sourceMap, tsconfig }),
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
      externals({ include: /^@aws-amplify/ }),
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
