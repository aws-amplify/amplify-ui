import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import * as createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import sitemapUrls from 'sitemap-urls';
import * as fs from 'fs';

dotenv.config();

const BASE_URL = 'http://localhost:3000';

export default defineConfig({
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: 'features/**/*.feature',
    async setupNodeEvents(on, config) {
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
          return 'good';
        },
        log: (message) => {
          console.log(message);
          return null;
        },
      });

      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      Object.assign(config.env, process.env);

      return config;
    },
  },
  videoUploadOnPasses: false,
});
