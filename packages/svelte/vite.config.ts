import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    svelte({
      preprocessors: [],
    }),
    dts({
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'src/test-setup.ts'],
      outDir: 'dist/types',
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AmplifyUISvelte',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'svelte',
        'svelte/store',
        'svelte/motion',
        'svelte/transition',
        'svelte/animate',
        'svelte/internal',
        '@aws-amplify/ui',
        '@aws-amplify/core',
        'aws-amplify',
        'aws-amplify/auth',
        'xstate',
        '@xstate/svelte',
      ],
      output: {
        // CSS ファイルを別途出力
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'styles.css';
          }
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});