// vite.config.js
const path = require('path');
const { defineConfig } = require('vite');
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import vue from '@vitejs/plugin-vue';
import analyze from 'rollup-plugin-analyzer';

module.exports = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      plugins: [dynamicImportVars(), analyze()],
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'aws-amplify',
        'vue',
        '@aws-amplify/ui-components/dist/components',
        '@aws-amplify/ui-components/loader',
        '@aws-sdk',
        '@aws-amplify',
        '@aws-amplify/ui-components',
        '@aws-amplify/ui-components/dist/components/index.js',
      ],
      output: [
        {
          format: 'es',
          esModule: true,
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'umd',
          inlineDynamicImports: true,
          interop: 'esModule',
          exports: 'named',
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
  },
});
