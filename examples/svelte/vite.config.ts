import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit({
      compilerOptions: { css: 'external' },
      // Consult https://svelte.dev/docs/kit/integrations
      // for more information about preprocessors
      preprocess: vitePreprocess(),

      // This example app renders entirely on the client (Amplify Authenticator),
      // so it is served as a single-page app. See https://svelte.dev/docs/kit/adapters
      // for more information about adapters.
      // `fallback` makes adapter-static emit an SPA fallback page (200.html) that is
      // returned for every matched request, including `/` and deep E2E routes like
      // `/ui/components/authenticator/...`; client-side routing then renders the
      // matched page. Without a fallback these routes would 404 under `vite preview`.
      adapter: adapter({ fallback: '200.html' }),
      output: { bundleStrategy: 'single' },
    }),
  ],
  server: { port: 3000, fs: { strict: true } },
  resolve: {
    // The Svelte workspaces are nohoisted, so `aws-amplify` is installed in
    // this example, in packages/svelte and at the repo root. Without dedupe the
    // app, @aws-amplify/ui-svelte and @aws-amplify/ui each bundle their own
    // copy, and `Amplify.configure()` in a page never reaches the Authenticator.
    // xstate is deduped for the same reason: the auth machine is shared.
    dedupe: ['aws-amplify', '@aws-amplify/auth', '@aws-amplify/core', 'xstate'],
    alias: [
      {
        find: './runtimeConfig',
        replacement: './runtimeConfig.browser',
      },
      {
        find: '@environments',
        replacement: path.resolve(import.meta.dirname, '../../environments/'),
      },
    ],
  },
});
