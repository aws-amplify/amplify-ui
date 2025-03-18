import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import externals from 'rollup-plugin-node-externals';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// common config settings for Vue package (only has index.ts, not internal.ts or server.ts)
const input = ['src/index.ts'];
const esmOutputDir = 'dist/esm';

/**
 * @type {import('rollup').OutputOptions}
 */
const cjsOutput = {
  dir: 'dist',
  entryFileNames: '[name].cjs',
  esModule: true,
  format: 'cjs',
  generatedCode: { reservedNamesAsProps: false },
  interop: 'auto',
  exports: 'named'
};

// shared plugins
const vuePlugin = vue({
  compilerOptions: {
    isCustomElement: (tag) => tag.startsWith('amplify-')
  }
});

// shared typescript configuration
const typescriptConfig = {
  check: false, // disable type checking during build
  tsconfigOverride: {
    include: ['src/**/*'],
    exclude: ['**/__tests__/**/*'],
    compilerOptions: {
      declaration: true,
      declarationDir: 'dist',
      skipLibCheck: true,
      noImplicitAny: false,
      strictNullChecks: false
    }
  }
};

const config = defineConfig([
  // CJS config
  {
    input,
    output: cjsOutput,
    external: ['vue'],
    plugins: [
      externals({ include: [/node_modules/, /^@aws-amplify/] }),
      nodeResolve(),
      commonjs(),
      vuePlugin,
      postcss({
        extract: 'style.css',
        minimize: true,
        sourceMap: false
      }),
      typescript({ 
        ...typescriptConfig
      }),
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
      exports: 'named'
    },
    external: ['vue'],
    plugins: [
      externals({ include: [/node_modules/, /^@aws-amplify/] }),
      nodeResolve({
        extensions: ['.js', '.ts', '.vue']
      }),
      commonjs(),
      vuePlugin,
      postcss({
        extract: false,
        inject: false,
        sourceMap: false
      }),
      typescript({
        ...typescriptConfig,
        outDir: esmOutputDir,
        tsconfigOverride: {
          ...typescriptConfig.tsconfigOverride,
          compilerOptions: {
            ...typescriptConfig.tsconfigOverride.compilerOptions,
            declaration: false
          }
        }
      }),
    ],
  },
]);

export default config;
