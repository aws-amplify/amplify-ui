import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Pages()],
  server: {
    port: 3001,
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
