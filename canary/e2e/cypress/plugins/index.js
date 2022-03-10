/// <reference types="cypress" />
// ***********************************************************
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const cucumber = require('cypress-cucumber-preprocessor').default;
const path = require('path');
require('dotenv-safe').config({
  allowEmptyValues: true,
});

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const options = {
    typescript: path.join(path.resolve('.'), 'node_modules/typescript'),
  };
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', cucumber(options));

  // Assign .env variables to Cypress config
  Object.assign(config.env, process.env);
  return config;
};
