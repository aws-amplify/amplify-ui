/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

When('I confirm my password', () => {
  cy.findInputField('Confirm Password')
    .type(Cypress.env('VALID_PASSWORD'))
    .blur()
    .wait(100);
});

When('I confirm my short password', () => {
  cy.findInputField('Confirm Password').type('inv').blur().wait(100);
});

Then('I see {string} as an input field', (name: string) => {
  cy.findByRole('textbox', { name }).should('exist');
});

Then("I don't see {string} as an input field", (name: string) => {
  cy.findByRole('textbox', { name }).should('not.exist');
});
