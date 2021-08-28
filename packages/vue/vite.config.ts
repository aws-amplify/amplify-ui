// vite.config.js

import { defineConfig } from 'vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [
    vue(),

    typescript2({
      check: true,
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ['vite.config.ts'],
      },
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolvePath('./src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'ui-vue',
      fileName: (format) => (format === 'es' ? 'index.js' : `index.${format}`),
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
