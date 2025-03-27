import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs-extra';
import path from 'path';

// common config settings
const input = ['src/index.ts'];
const sourceMap = false;

// Ensure styles are copied to the correct location
const ensureStyles = () => {
  return {
    name: 'ensure-styles',
    writeBundle() {
      // Copy the primitive styles to the dist directory
      const primitivesStylesPath = path.resolve('src/components/primitives/styles.css');
      const destDir = path.resolve('dist/components/primitives');
      
      // Ensure the directory exists
      fs.ensureDirSync(destDir);
      
      // Copy the CSS file
      fs.copyFileSync(primitivesStylesPath, path.join(destDir, 'styles.css'));
      
      console.log('Primitive styles copied successfully');
    }
  };
};

const esmOutputDir = 'dist/esm';

/**
 * @type {import('rollup').OutputOptions}
 */
const cjsOutput = {
  dir: 'dist',
  entryFileNames: '[name].cjs',
  format: 'cjs',
  esModule: true,
  generatedCode: { reservedNamesAsProps: false },
  interop: 'auto',
  exports: 'named'
};

// Vue plugin configuration - customized for full SFC compilation
const vuePlugin = vue({
  // Enable pre-processing of styles
  preprocessStyles: true,
  // Use custom compiler options
  template: {
    isProduction: true,
    compilerOptions: {
      whitespace: 'condense',
      // Don't treat kebab-case components as custom elements
      isCustomElement: tag => /^amplify-/.test(tag)
    }
  }
});

// External dependencies
const externalDeps = [
  'vue',
  '@vueuse/core',
  '@xstate/vue',
  'xstate',
  /^@aws-amplify/
];

const config = defineConfig([
  // CJS config
  {
    input,
    output: cjsOutput,
    external: externalDeps,
    plugins: [
      externals({ include: [/node_modules/, /^@aws-amplify/] }),
      nodeResolve({
        extensions: ['.js', '.ts', '.vue', '.css']
      }),
      commonjs({
        include: /node_modules/
      }),
      postcss({
        extract: false,
        inject: false
      }),
      vuePlugin,
      typescript({
        check: false,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            sourceMap,
            declaration: true,
            declarationDir: 'dist',
            rootDir: 'src',
          },
          include: ['src/**/*'],
          exclude: ['node_modules', '**/__tests__/**', '**/*.test.*']
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
    external: externalDeps,
    plugins: [
      externals({ include: [/node_modules/, /^@aws-amplify/] }),
      nodeResolve({
        extensions: ['.js', '.ts', '.vue', '.css']
      }),
      commonjs({
        include: /node_modules/
      }),
      postcss({
        extract: false,
        inject: false
      }),
      vuePlugin,
      typescript({
        check: false,
        tsconfigOverride: {
          compilerOptions: {
            sourceMap,
            declaration: false,
            rootDir: 'src',
            outDir: esmOutputDir,
          },
          include: ['src/**/*'],
          exclude: ['node_modules', '**/__tests__/**', '**/*.test.*']
        }
      }),
    ],
  },
]);

export default config;

