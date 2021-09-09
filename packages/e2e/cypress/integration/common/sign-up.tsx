/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I confirm my password', () => {
  cy.findByPlaceholderText(/confirm password/i).type(
    Cypress.env('VALID_PASSWORD')
  );
});

Then('I see {string} as an input field', (name: string) => {
  cy.findByRole('textbox', { name }).should('exist');
});

Then("I don't see {string} as an input field", (name: string) => {
  cy.findByRole('textbox', { name }).should('not.exist');
});
