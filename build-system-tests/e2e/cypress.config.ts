import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  defaultCommandTimeout: 15000,
  e2e: {
    baseUrl: 'http://localhost:3000/',
    specPattern: 'features/**/*.feature',

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          define: { global: 'window' },
          plugins: [createEsbuildPlugin(config)],
        })
      );

      Object.assign(config.env, process.env);

      // @badeball/cypress-cucumber-preprocessor v28 filters specs using the
      // lowercase `tags` env key, but CI supplies the tag expression via the
      // uppercase `TAGS` variable. Map it across only when a lowercase `tags`
      // was not explicitly supplied via the environment, so an explicit
      // `tags` still wins while CI's `TAGS` overrides the `not @skip` default
      // below.
      if (config.env.TAGS && process.env.tags === undefined) {
        config.env.tags = config.env.TAGS;
      }

      return config;
    },
  },
  env: {
    tags: 'not @skip',
  },
  video: false,
});
