/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
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

    cy.intercept(routeMatcher, { fixture });
  }
);

Given(
  'I intercept {string} with error fixture {string}',
  (json: string, fixture: string) => {
    let routeMatcher;

    try {
      routeMatcher = JSON.parse(json);
    } catch (error) {
      throw error;
    }

    cy.intercept(routeMatcher, { statusCode: 400, fixture });
  }
);

Given(
  'I mock {string} with fixture {string}',
  (path: string, fixture: string) => {
    let paths = path.split('.');
    const method = paths.pop();
    const obj = get(window, paths);

    if (!window) {
      throw new Error(`window has not been set in the Cypress tests`);
    }

    if (!obj || !method) {
      throw new Error(`Could not find "${path}" on the window`);
    }

    cy.fixture(fixture).then((result) => {
      console.info('`%s` mocked with %o', path, result);
      cy.stub(obj, method).returns(result);
    });
  }
);

When('I type an invalid password', () => {
  cy.findInputField('Password').type('invalidpass');
});

When('I type a new {string}', (field: string) => {
  cy.findInputField(field).typeAliasWithStatus(field, `${Date.now()}`);
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

When('I click the {string} checkbox', (label: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(label)}`, 'i')).click({
    // We have to force this click because the checkbox button isn't visible by default
    // and instead has ::before decoration.
    //
    //    cy.click() failed because this element:
    //    <input ...> is being covered by another element:
    //    <form ...>...</form>
    force: true,
  });
});

When('I click the {string} radio button', (label: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(label)}`, 'i')).click({
    // We have to force this click because the radio input type isn't visible by default
    // and instead has ::before decoration.
    //
    //    cy.click() failed because this element:
    //    <input ...> is being covered by another element:
    //    <form ...>...</form>
    force: true,
  });
});

When('I reload the page', () => {
  cy.reload();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(escapeRegExp(message), 'i'));
});

Then('I see the {string} image', (alt: string) => {
  cy.findByAltText(alt).should('exist');
});

Then('I see {string} as a {string} field', (label: string, type: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(label)}$`, 'i')).should(
    'have.attr',
    'type',
    type
  );
});

Then('I see {string} as an {string} field', (label: string, type: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(label)}$`, 'i')).should(
    'have.attr',
    'type',
    type
  );
});

Then("I don't see {string}", (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'))
    .should('not.exist');
});

Then(
  '{string} field autocompletes {string}',
  (fieldName: string, autocomplete: string) => {
    cy.findInputField(fieldName)
      .should('have.attr', 'autocomplete')
      .should('eq', autocomplete);
  }
);

Then('the {string} button is disabled', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).should('be.disabled');
});

Then('the {string} field is invalid', (name: string) => {
  cy.findInputField(name)
    .then(($el) => $el.get(0).checkValidity())
    .should('be.false');
});

When('I type a valid confirmation code', () => {
  // This should be intercepted & mocked
  cy.findByLabelText('Confirmation Code').type('validcode');
});

When('I type an invalid confirmation code', () => {
  cy.findByLabelText('Confirmation Code').type('invalidcode');
});
