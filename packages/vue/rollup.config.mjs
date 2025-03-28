import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs-extra';

// common config settings
const input = ['src/index.ts'];
const sourceMap = false;
const esmOutputDir = 'dist/esm';

// Common output options
const cjsOutput = {
  dir: 'dist',
  entryFileNames: '[name].cjs',
  format: 'cjs',
  esModule: true,
  generatedCode: { reservedNamesAsProps: false },
  interop: 'auto',
  exports: 'named'
};

// Common plugins
const commonPlugins = [
  externals({ include: [/node_modules/, /^@aws-amplify/] }),
  nodeResolve({ extensions: ['.js', '.ts', '.vue', '.css'] }),
  commonjs({ include: /node_modules/ }),
  postcss({ extract: false, inject: false }),
  vue({
    preprocessStyles: true,
    template: {
      isProduction: true,
      compilerOptions: {
        whitespace: 'condense',
        isCustomElement: tag => /^amplify-/.test(tag)
      }
    }
  })
];

// Ensure styles are copied
const ensureStyles = () => ({
  name: 'ensure-styles',
  writeBundle() {
    fs.ensureDirSync('dist/components/primitives');
    fs.copyFileSync(
      'src/components/primitives/styles.css',
      'dist/components/primitives/styles.css'
    );
  }
});

const config = defineConfig([
  // CJS config
  {
    input,
    output: cjsOutput,
    plugins: [
      ...commonPlugins,
      typescript({
        check: false,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: { sourceMap, declaration: true, declarationDir: 'dist', rootDir: 'src' },
          include: ['src/**/*'],
          exclude: ['node_modules', '**/__tests__/**', '**/*.test.*', 'scripts/**']
        }
      }),
      ensureStyles()
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
      preserveModulesRoot: 'src'
    },
    plugins: [
      ...commonPlugins,
      typescript({
        check: false,
        tsconfigOverride: {
          compilerOptions: { sourceMap, declaration: false, rootDir: 'src', outDir: esmOutputDir },
          include: ['src/**/*'],
          exclude: ['node_modules', '**/__tests__/**', '**/*.test.*']
        }
      })
    ],
  },
]);

export default config;
