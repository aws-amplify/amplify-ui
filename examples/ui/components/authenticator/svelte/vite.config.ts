import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@environments': path.resolve(__dirname, '../../../../environments'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});