import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import path from 'path';
import { defineConfig } from 'vite';

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.svelte', 'src/lib/stores/*.svelte.ts'],
      exclude: ['dist/**', '.svelte-kit/**'],
      thresholds: {
        // we only have very basic snapshot testing.
        // this results in very low numbers for functions and branches
        // as no logic is executed.
        // this will be enhanced in future.
        branches: 66,
        functions: 50,
        lines: 95,
        statements: 95,
      },
    },
  },
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
      entry: resolvePath('./src/lib/index.ts'),
      formats: ['es', 'cjs'],
      name: 'ui-svelte',
      fileName: (format: string) =>
        format === 'es' ? 'index.js' : `index.${format}`,
    },
    rollupOptions: {
      plugins: [dynamicImportVars],
      external: [
        '@aws-amplify/auth',
        '@aws-amplify/core',
        '@aws-amplify/core/internals/utils',
        'aws-amplify',
        'aws-amplify/auth',
        'aws-amplify/core',
        'aws-amplify/utils',
      ],
    },
  },
});
