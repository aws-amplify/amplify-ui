// vite.config.js

import { defineConfig } from 'vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ['src/components/primitives'],
      exclude: [/node_modules/],
    }),
    typescript2({
      check: false,
      include: ['src/components/*.vue', 'src/components/primitives/*.vue'],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ['vite.config.ts', '__tests__'],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
    ],
  },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolvePath('./src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'ui-vue',
      fileName: (format: string) =>
        format === 'es' ? 'index.js' : `index.${format}`,
    },
    rollupOptions: {
      plugins: [dynamicImportVars],
      external: ['aws-amplify', 'vue', '@aws-amplify/auth'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
