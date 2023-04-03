import { getHeapStatistics } from 'v8';
import { defineConfig } from 'cypress';
import { BASE_URL } from './cypress/data/constants';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log: (message) => {
          console.log(message);
          return null;
        },
        logTable: (data) => {
          console.table(data);
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
