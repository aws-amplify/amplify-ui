/// <reference types="cypress" />
// ***********************************************************
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const cucumber = require('cypress-cucumber-preprocessor').default;
const resolve = require('resolve');
require('dotenv-safe').config();

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const options = {
    typescript: resolve.sync('typescript', { baseDir: config.projectRoot }),
  };
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber(options));

  // Assign .env variables to Cypress config
  Object.assign(config.env, process.env);
  return config;
};
