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
      // Ingest process env and map the tag expression BEFORE the plugin call.
      // addCucumberPreprocessorPlugin reads `config.env.tags` synchronously
      // during its own initialization to filter `specPattern`; anything set
      // after `await addCucumberPreprocessorPlugin(on, config)` arrives too
      // late and leaves filtering inert.
      Object.assign(config.env, process.env);

      // @badeball/cypress-cucumber-preprocessor v28 filters specs using the
      // lowercase `tags` env key, but CI supplies the tag expression via the
      // uppercase `TAGS` variable. Map it across only when a lowercase `tags`
      // was not explicitly supplied, so a direct/local `tags` still takes
      // precedence.
      if (config.env.TAGS && process.env.tags === undefined) {
        config.env.tags = config.env.TAGS;
      }

      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      // This is a chrome launch option which enables fake videos and WebGL for CI
      on('before:browser:launch', (browser, launchOptions) => {
        launchOptions.args.push(
          '--use-file-for-fake-video-capture=cypress/fixtures/faceRecording.y4m'
        );

        // Enable software WebGL rendering for maplibre-gl in headless CI environments
        if (browser.name === 'chrome') {
          // Use SwiftShader for software WebGL rendering (works in headless)
          launchOptions.args.push('--use-gl=angle');
          launchOptions.args.push('--use-angle=swiftshader');
          launchOptions.args.push('--enable-webgl');
          launchOptions.args.push('--ignore-gpu-blocklist');
        }

        return launchOptions;
      });

      return config;
    },
  },
  video: false,
});
