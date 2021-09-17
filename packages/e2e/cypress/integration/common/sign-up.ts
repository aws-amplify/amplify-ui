/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { escapeRegExp } from 'lodash';

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

And('I click the Create Account tab', () => {
  cy.findByRole('tab', {
    name: new RegExp(`^${escapeRegExp('Create Account')}$`, 'i'),
  }).click();
});
