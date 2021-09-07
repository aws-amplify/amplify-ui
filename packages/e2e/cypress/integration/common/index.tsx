/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (example: string) => {
  cy.visit(example);
});

When('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name: new RegExp(name, 'i') }).click();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(message, 'i'));
});
