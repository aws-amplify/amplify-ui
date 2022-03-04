/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { get, escapeRegExp } from 'lodash';

let language = 'en-US';
let window = null;

Given("I'm running the example {string}", (example: string) => {
  cy.visit(example, {
    // See: https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'language', { value: language });
    },
    onLoad(contentWindow) {
      window = contentWindow;
    },
  });
});

Given(
  'I intercept {string} with fixture {string}',
  (json: string, fixture: string) => {
    let routeMatcher;

    try {
      routeMatcher = JSON.parse(json);
    } catch (error) {
      throw error;
    }

    cy.intercept(routeMatcher, { fixture }).as('route');
  }
);

When('I click the {string} tab', (label: string) => {
  cy.findByRole('tab', {
    name: new RegExp(`^${escapeRegExp(label)}$`, 'i'),
  }).click();
});

When('I click the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).click();
});

Then('I see the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).should('be.visible');
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'))
    .should('exist');
});

When('I type a new {string}', (field: string) => {
  cy.findInputField(field).typeAliasWithStatus(field, `${Date.now()}`);
});
