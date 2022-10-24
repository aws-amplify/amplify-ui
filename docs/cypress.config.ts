import { defineConfig } from 'cypress';
import sitemapUrls from 'sitemap-urls';

const fs = require('fs');
const baseUrl = 'http://localhost:5001';

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
            return sitemapLinks;
          }
        },
        log: (message) => {
          console.log(message);

          return null;
        },
      });
    },
    baseUrl,
    numTestsKeptInMemory: 0,
  },
});
