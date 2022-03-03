/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

When('I confirm my password', () => {
  cy.findInputField('Confirm Password')
    .type(Cypress.env('VALID_PASSWORD'))
    .blur()
    .wait(100);
});
