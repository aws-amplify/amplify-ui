import { defineConfig } from 'cypress';
import sitemapUrls from 'sitemap-urls';
import { BASE_URL } from './cypress/data/constants';
import fs from 'fs';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readSitemapLinks: async () => {
          if (fs.existsSync('./public/sitemap.xml')) {
            const siteMapContent = fs.readFileSync(
              './public/sitemap.xml',
              'utf8'
            );
            const sitemapLinks: string[] = await sitemapUrls.extractUrls(
              siteMapContent
            );
            return sitemapLinks.map((link) =>
              link
                .replace(`${BASE_URL}/`, '')
                .replace('https://www.dev.ui.docs.amplify.aws/', '')
                .replace('https://ui.docs.amplify.aws/', '')
            );
          }
        },
        log: (message) => {
          console.log(message);
          return null;
        },
      });
    },
    baseUrl: BASE_URL,
    numTestsKeptInMemory: 1,
    supportFile: false,
  },
});
