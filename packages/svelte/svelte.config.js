import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    css: 'external',
  },
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    inlineStyleThreshold: Infinity,
    output: {
      preloadStrategy: 'modulepreload',
      bundleStrategy: 'single',
    },
  },
};

export default config;
