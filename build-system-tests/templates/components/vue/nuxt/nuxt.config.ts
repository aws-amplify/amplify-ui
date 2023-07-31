// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: { './runtimeConfig': './runtimeConfig.browser' },
  vite: {
    define: {
      'window.global': {},
    },
  },
});
