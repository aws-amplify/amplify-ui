import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import voie from 'vite-plugin-voie';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), voie()],
  server: {
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
