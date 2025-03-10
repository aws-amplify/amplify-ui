import { defineConfig } from 'rollup';
import { fileURLToPath } from 'url';
import path from 'path';
import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import externals from 'rollup-plugin-node-externals';
import esbuild from 'rollup-plugin-esbuild';
import typescript2 from 'rollup-plugin-typescript2';

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolvePath = (str) => path.resolve(__dirname, str);

// common config settings
const input = 'src/index.ts';
const sourceMap = true;
const tsconfig = 'tsconfig.dist.json';

// External dependencies that shouldn't be bundled
const external = [
  '@aws-amplify/auth',
  '@aws-amplify/core',
  '@aws-amplify/core/internals/utils',
  'aws-amplify',
  'aws-amplify/auth',
  'aws-amplify/core',
  'aws-amplify/utils',
  'vue',
  'qrcode',
  'nanoid',
  '@vueuse/core',
  '@xstate/vue',
  'xstate'
];

/**
 * @type {import('rollup').OutputOptions}
 */
const cjsOutput = {
  file: resolvePath('./dist/index.cjs'),
  format: 'cjs',
  exports: 'named',
  sourcemap: sourceMap,
  globals: { vue: 'Vue' }
};

/**
 * @type {import('rollup').OutputOptions}
 */
const esmOutput = {
  file: resolvePath('./dist/index.js'),
  format: 'es',
  exports: 'named',
  sourcemap: sourceMap
};

// Following React's approach with Vue-specific additions
const config = defineConfig({
  input: resolvePath(input),
  output: [cjsOutput, esmOutput],
  external,
  plugins: [
    // Exclude test files and node_modules
    externals({
      exclude: ['tslib'],
    }),
    resolve({
      extensions: ['.js', '.ts', '.vue']
    }),
    commonjs(),
    // Vue-specific plugins
    vue({
      preprocessStyles: true,
      template: {
        isProduction: true
      }
    }),
    postcss({
      extract: 'style.css',
      minimize: true,
      sourceMap: true
    }),
    // Use typescript2 for proper declaration file generation
    typescript2({
      check: false,
      tsconfig: resolvePath(tsconfig),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
          outDir: resolvePath('./dist'),
          declarationDir: resolvePath('./dist')
        },
        exclude: [
          "**/__tests__/**",
          "**/__mocks__/**",
          "**/*.spec.ts",
          "global-spec.ts",
          "node_modules"
        ]
      }
    }),
    // Use esbuild for faster JavaScript transpilation
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules|__tests__|__mocks__/,
      sourceMap: true,
      target: 'es2015',
      tsconfig: resolvePath(tsconfig)
    }),
    dynamicImportVars
  ]
});

export default config; 