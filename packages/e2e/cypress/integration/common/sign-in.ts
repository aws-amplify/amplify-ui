/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { When } from 'cypress-cucumber-preprocessor/steps';

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    cy.findInputField(loginMechanism).typeAliasWithStatus(
      loginMechanism,
      status
    );
  }
);

When('I type my password', () => {
  cy.findByPlaceholderText(/password/i).type(Cypress.env('VALID_PASSWORD'));
});

When('I type an invalid password', () => {
  cy.findByPlaceholderText(/password/i).type('invalidpass');
});
