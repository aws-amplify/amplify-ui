import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 3000,
    fs: {
      strict: true,
    },
  },
  resolve: {
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
      {
        find: '@environments',
        replacement: path.resolve(__dirname, '../../environments/'),
      },
    ],
  },
});
