// Serve this example as a single-page app. The demo pages are client-only
// (Amplify Authenticator), so we disable server-side rendering and prerendering
// and rely on adapter-static's SPA fallback (see svelte.config.js) to return the
// app shell for `/` and every nested `/ui/...` E2E route.
export const ssr = false;
export const prerender = false;
