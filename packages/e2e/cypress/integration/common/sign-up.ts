/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { escapeRegExp } from 'lodash';

Given('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

When('I confirm my password', () => {
  cy.findInputField('Confirm Password').type(Cypress.env('VALID_PASSWORD'));
});

Then('I see {string} as an input field', (name: string) => {
  cy.findByRole('textbox', { name }).should('exist');
});

Then("I don't see {string} as an input field", (name: string) => {
  cy.findByRole('textbox', { name }).should('not.exist');
});
