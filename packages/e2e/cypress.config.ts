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
      // Ingest process env BEFORE the plugin call. addCucumberPreprocessorPlugin
      // reads the tag expression synchronously during its own initialization to
      // filter `specPattern`; anything set after
      // `await addCucumberPreprocessorPlugin(on, config)` arrives too late and
      // leaves filtering inert.
      Object.assign(config.env, process.env);

      // CI supplies the cucumber tag expression via the uppercase `TAGS`
      // variable (fall back to a lowercase `tags` when explicitly provided).
      const tagExpression = process.env.tags ?? process.env.TAGS;
      if (tagExpression) {
        // @badeball/cypress-cucumber-preprocessor v28 reads the tag expression
        // from `getEnv(config)`. Under Cypress >= 16 ("Expose era") that
        // resolves to `config.expose` (NOT `config.env`), and the browser
        // runtime reads it via `Cypress.expose('tags')`. Populate the expose
        // channel so BOTH spec-level (filterSpecs) and scenario-level filtering
        // activate; without it every scenario matches and all 97 cross-framework
        // specs run, causing wrong-framework 404s.
        config.expose = { ...(config.expose ?? {}), tags: tagExpression };
        // Preserve behavior on Cypress < 16 ("Env era"), where the preprocessor
        // reads the expression from `config.env` instead.
        config.env.tags = tagExpression;
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
