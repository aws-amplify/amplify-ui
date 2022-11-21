import { defineConfig } from 'cypress';
import sitemapUrls from 'sitemap-urls';
import { BASE_URL } from './cypress/data/constants';
import fs from 'fs';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log: (message) => {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: BASE_URL,
    numTestsKeptInMemory: 1,
    supportFile: false,
    video: false,
  },
});
