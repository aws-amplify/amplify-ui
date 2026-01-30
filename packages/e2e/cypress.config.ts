import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import * as createBundler from '@bahmutov/cypress-esbuild-preprocessor';
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
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      Object.assign(config.env, process.env);

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
