// vite.config.js
const path = require('path');
const { defineConfig } = require('vite');
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import vue from '@vitejs/plugin-vue';

module.exports = defineConfig({
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ui-vue',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      plugins: [dynamicImportVars()],
      external: ['aws-amplify', 'vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
