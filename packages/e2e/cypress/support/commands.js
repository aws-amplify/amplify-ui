// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { escapeRegExp } from 'lodash';
Cypress.Commands.add('findInputField', (field) => {
  const passwordFieldNames = ['password', 'confirm password'];
  const isPasswordField = passwordFieldNames.includes(field.toLowerCase());
  const regexString = `^${escapeRegExp(field)}$`;
  const regex = new RegExp(regexString, 'i');

  if (isPasswordField) {
    // TODO: we should use cy.findByLabelText once our dom is cleaned up
    return cy.findByPlaceholderText(regex);
  } else {
    return cy.findByRole('textbox', { name: regex });
  }
});

import '@testing-library/cypress/add-commands';
