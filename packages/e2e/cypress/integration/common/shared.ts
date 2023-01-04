/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import {
  And,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
import { get, escapeRegExp } from 'lodash';

let language = 'en-US';
let window = null;
let stub = null;

/**
 * Given dot delimited paths to a method (e.g. Amplify.Auth.signIn) on window,
 * returns the object that holds the method (Amplify.Auth) and the method (signIn).
 *
 * Used for mocking and spying Amplify methods.
 */
const getMethodFromWindow = (path: string) => {
  const paths = path.split('.');
  const method = paths.pop();
  const obj = get(window, paths);

  if (!window) {
    throw new Error('window has not been set in the Cypress tests');
  }

  if (!obj || !method) {
    throw new Error(`Could not find "${path}" on the window`);
  }

  return { obj, method };
};

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

Given("I'm running the docs page {string}", (page: string) => {
  cy.visit(page, {
    // See: https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
    onBeforeLoad(win) {
      Object.defineProperty(win.navigator, 'language', { value: language });
    },
    onLoad(contentWindow) {
      window = contentWindow;
    },
  });
});

Given("I'm running the docs page", () => {
  cy.visit('/');
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

Given('I verify the body has {string} included', (value: string) => {
  cy.wait('@route').its('request.body.Username').should('include', value);
});

Given('I verify the body starts with {string}', (value: string) => {
  cy.wait('@route')
    .its('request.body.Username')
    .should('match', new RegExp(`^${escapeRegExp(value)}`));
});

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
    const { obj, method } = getMethodFromWindow(path);

    cy.fixture(fixture).then((result) => {
      console.info('`%s` mocked with %o', path, result);
      stub = cy.stub(obj, method);
      stub.returns(result);
    });
  }
);

When('Sign in was called with {string}', (username: string) => {
  let tempStub = stub.calledWith(username, Cypress.env('VALID_PASSWORD'));
  stub = null;
  expect(tempStub).to.be.true;
});

When('I type an invalid password', () => {
  cy.findInputField('Password').type('invalidpass');
});

When('I type a short password', () => {
  cy.findInputField('Password').type('inv');
});

When('I type an invalid wrong complexity password', () => {
  cy.findInputField('Password').type('inv');
});

When('I type an invalid no lower case password', () => {
  cy.findInputField('Password').type('INV');
});

When('I type a new {string}', (field: string) => {
  cy.findInputField(field).typeAliasWithStatus(field, `${Date.now()}`);
});

const typeInInputHandler = (field: string, value: string) => {
  cy.findInputField(field).type(value);
};
When('I type a new {string} with value {string}', typeInInputHandler);

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
  }).should('exist');
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

Then('I see tab {string}', (search: string) => {
  cy.findAllByRole('tab').first().should('be.visible').contains(search);
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'))
    .should('exist');
});

Then('I see placeholder {string}', (message: string) => {
  cy.findByPlaceholderText(message).should('exist');
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

Then(
  '{string} field does not have {string}',
  (fieldName: string, attribute: string) => {
    cy.findByLabelText(fieldName).should('not.have.attr', attribute);
  }
);

Then(
  '{string} field does not have class {string}',
  (fieldName: string, className: string) => {
    cy.findByText(fieldName).should('not.have.class', className);
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

Then(
  'the {string} select drop down is {string}',
  (name: string, value: string) => {
    cy.findByLabelText(new RegExp(`^${escapeRegExp(name)}`, 'i'))
      .find('option:selected')
      .contains(value);
  }
);

Then(
  'the {string} select drop down should have a length of {string}',
  (name: string, value: string) => {
    cy.findByLabelText(new RegExp(`^${escapeRegExp(name)}`, 'i'))
      .find('option')
      .should('have.length', value);
  }
);

When('I type a valid confirmation code', () => {
  // This should be intercepted & mocked
  cy.findInputField('Confirmation Code').type('123456');
});

When('I type a custom password from label {string}', (custom) => {
  cy.findByLabelText(custom).type(Cypress.env('VALID_PASSWORD'));
});

When('I type a custom confirm password from label {string}', (custom) => {
  cy.findByLabelText(custom).type(Cypress.env('VALID_PASSWORD'));
});

When('I type a valid SMS confirmation code', () => {
  // This should be intercepted & mocked
  cy.findInputField('Code *').type('123456');
});

When('I type an invalid confirmation code', () => {
  cy.findInputField('Confirmation Code').type('0000');
});

When('I see one code input', () => {
  cy.get('input').should('have.length', 1);
});

When('I see {string} as the {string} input', (custom, order) => {
  cy.get('input').eq(order).should('have.attr', 'placeholder', custom);

  // cy.findByLabelText(custom).type(Cypress.env('VALID_PASSWORD'));
});

When('I mock {string} event', (eventName: string) => {
  if (!window) {
    throw new Error('window has not been set in the Cypress tests');
  }

  const Hub = window['Hub'];
  if (!Hub) {
    throw new Error('Hub is not available on the window.');
  }

  Hub.dispatch('auth', { event: eventName, data: {} });
});

When(
  'I mock {string} event with fixture {string}',
  async (eventName: string, fixture: string) => {
    if (!window) {
      throw new Error('window has not been set in the Cypress tests');
    }

    const Hub = window['Hub'];
    if (!Hub) {
      throw new Error('Hub is not available on the window.');
    }

    cy.fixture(fixture).then((data) => {
      Hub.dispatch('auth', { event: eventName, data });
    });
  }
);

Given('I spy {string} method', (path) => {
  const { obj, method } = getMethodFromWindow(path);
  cy.spy(obj, method).as(path);
});

Then('{string} method is called', (path) => {
  cy.get(`@${path}`).should('have.been.calledOnce');
});

When('I type a valid code', () => {
  /**
   * Confirmation code differs on React/Vue vs Angular. Testing for both for
   * now, but we can look to make them consistent on next major release.
   */
  const regex = new RegExp(`^(confirmation )?code( *)?`, 'i');
  cy.findByRole('spinbutton', { name: regex }).type('1234');
});

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findInputField('New Password').should('exist');
});

When('I type an invalid wrong complexity new password', () => {
  cy.findInputField('New Password').type('inv');
});

When('I type an invalid no lower case new password', () => {
  cy.findInputField('New Password').type('INV');
});

When('I type my new password', () => {
  cy.findInputField('New Password').type(Cypress.env('VALID_PASSWORD'));
});

Then('I click the submit button', () => {
  /**
   * Submit button text differs on React/Vue vs Angular. Testing for both for
   * now, but we can look to make them consistent on next major release.
   */
  cy.findByRole('button', {
    name: new RegExp(`^((submit)|(send code))$`, 'i'),
  }).click();
});

And('I confirm {string} error is accessible in password field', () => {
  // input field should be invalid
  cy.findInputField('Password')
    .should('have.attr', 'aria-invalid')
    .should('equal', 'true');

  // get aria-describedBy value
  cy.findInputField('Password')
    .should('have.attr', 'aria-describedBy')
    .as('describedBy');

  // get the error message id value
  cy.findAllByText('Password must have numbers')
    .parent() // error messages are collected in its parent div
    .should('have.attr', 'id')
    .as('errorId');

  cy.get('@describedBy').then((describedBy) => {
    cy.get('@errorId').then((errorId) => {
      // two `id`s should equal for the message to be accessible
      expect(describedBy).equals(errorId);
    });
  });
});

And('I confirm {string} error is accessible in new password field', () => {
  // input field should be invalid
  cy.findInputField('New Password')
    .should('have.attr', 'aria-invalid')
    .should('equal', 'true');

  // get aria-describedBy value
  cy.findInputField('New Password')
    .should('have.attr', 'aria-describedBy')
    .as('describedBy');

  // get the error message id value
  cy.findAllByText('Password must have numbers')
    .parent() // error messages are collected in its parent div
    .should('have.attr', 'id')
    .as('errorId');

  cy.get('@describedBy').then((describedBy) => {
    cy.get('@errorId').then((errorId) => {
      // two `id`s should equal for the message to be accessible
      expect(describedBy).equals(errorId);
    });
  });
});
