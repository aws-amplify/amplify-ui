import { defineConfig } from 'vite';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    preserveSymlinks: true,
    alias: [
      {
        find: '@environments',
        replacement: path.resolve(__dirname, '../../environments/'),
      },
    ],
  },
});
