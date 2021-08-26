// vite.config.js

import { defineConfig } from 'vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path, { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'ui-vue',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      plugins: [dynamicImportVars],
      external: ['aws-amplify', 'vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
