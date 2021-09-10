/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference path="../../support/index.d.ts" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

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
