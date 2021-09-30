/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { escapeRegExp } from 'lodash';

let language = 'en-US';

Given("I'm running the example {string}", (example: string) => {
  cy.visit(example, {
    // See: https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'language', { value: language });
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

    cy.intercept(routeMatcher, { fixture });
  }
);

When('I type a new {string}', (loginMechanism: string) => {
  cy.findInputField(loginMechanism).typeAliasWithStatus(
    loginMechanism,
    `${Date.now()}`
  );
});

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

When('I click the {string} radio button', (label: string) => {
  cy.findByLabelText(label).click({
    // We have to force this click because the radio input type isn't visible by default
    // and instead has ::before decoration.
    //
    //    cy.click() failed because this element:
    //    <input ...> is being covered by another element:
    //    <form ...>...</form>
    force: true,
  });
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
