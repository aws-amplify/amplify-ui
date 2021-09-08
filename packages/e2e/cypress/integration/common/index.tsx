/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />

import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { escapeRegExp } from 'lodash';

Given("I'm running the example {string}", (url) => {
  cy.visit(url);
});

When('I type a valid username {string}', (username: string) => {
  cy.findByRole('textbox', { name: /username/i }).type(Cypress.env(username));
});

And('I type a valid password {string}', (password: string) => {
  cy.findByLabelText(/password/i).type(Cypress.env(password));
});

When('I click the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).click();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(escapeRegExp(message), 'i'));
});
