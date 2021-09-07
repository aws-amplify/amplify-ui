/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />
import { When } from 'cypress-cucumber-preprocessor/steps';

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    cy.findByRole('textbox', {
      name: new RegExp(loginMechanism, 'i'),
    }).typeAliasWithStatus(loginMechanism, status);
  }
);

When('I type my password', () => {
  cy.findByLabelText(/password/i).type(Cypress.env('VALID_PASSWORD'));
});

When('I type an invalid password', () => {
  cy.findByLabelText(/password/i).type('invalidpass');
});
