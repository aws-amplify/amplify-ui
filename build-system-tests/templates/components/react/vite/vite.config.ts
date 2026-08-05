import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Amplify UI's transitive dependencies ship native BigInt literals (e.g. `10n`).
    // Vite 3's default browser target pins `safari13`, which predates BigInt support,
    // so esbuild fails the production build with:
    //   "Big integer literals are not available in the configured target environment".
    // Raising the target to BigInt-capable browsers keeps the vite@3 mega-app building.
    // (Vite >= 4 already defaults to `safari14`, so this is a no-op there.)
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
});
