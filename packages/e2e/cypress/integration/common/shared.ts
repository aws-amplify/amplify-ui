/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { escapeRegExp } from 'lodash';

Given("I'm running the example {string}", (example: string) => {
  cy.visit(example);
});

When('I type a new {string}', (loginMechanism: string) => {
  cy.findInputField(loginMechanism).typeAliasWithStatus(
    loginMechanism,
    `${Date.now()}`
  );
});

When('I click the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).click();
});

When('I click the {string} radio button', (label: string) => {
  cy.findByLabelText(label).click();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(escapeRegExp(message), 'i'));
});

Then(
  '{string} field autocompletes {string}',
  (fieldName: string, autocomplete: string) => {
    cy.findInputField(fieldName)
      .should('have.attr', 'autocomplete')
      .should('eq', autocomplete);
  }
);
