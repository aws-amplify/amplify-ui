import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    css: 'external',
  },
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess({
    assets: 'build',
  }),

  kit: {
    // This example app renders entirely on the client (Amplify Authenticator),
    // so it is served as a single-page app. See https://svelte.dev/docs/kit/adapters
    // for more information about adapters.
    // `fallback` makes adapter-static emit an SPA fallback page (200.html) that is
    // returned for every matched request, including `/` and deep E2E routes like
    // `/ui/components/authenticator/...`; client-side routing then renders the
    // matched page. Without a fallback these routes would 404 under `vite preview`.
    adapter: adapter({ fallback: '200.html' }),
    output: {
      bundleStrategy: 'single',
    },
  },
};

export default config;
