/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp, get } from 'lodash';

let language = 'en-US';
let window = null;
let stub = null;
export const randomFileName = `fileName${Math.random() * 10000}`;

const getRoute = (routeMatcher: { headers: { [key: string]: string } }) => {
  return `${routeMatcher.headers?.['X-Amz-Target'] || 'route'}`;
};
const getWaitRoute = (routeMatcher: { headers: { [key: string]: string } }) =>
  `@${getRoute(routeMatcher)}`;

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

      // Capture console errors for debugging
      win.console.error = (...args) => {
        cy.log('Console Error:', ...args);
      };
    },
    onLoad(contentWindow) {
      window = contentWindow;
    },
  });

  // Wait for page to be ready
  cy.get('body').should('exist');
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

Given('I intercept requests to host including {string}', (host: string) => {
  cy.intercept({ url: '**' }, (req) => {
    if (req.headers.host?.includes(host)) {
      req.alias = host;
    }
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

    cy.intercept(routeMatcher, { fixture }).as(getRoute(routeMatcher));
  }
);

Given(
  'I intercept and confirm {string} with fixture {string}',
  (json: string, fixture: string) => {
    let routeMatcher;

    try {
      routeMatcher = JSON.parse(json);
    } catch (error) {
      throw error;
    }

    cy.intercept(routeMatcher, { fixture }).as(getRoute(routeMatcher));
    cy.wait(getWaitRoute(routeMatcher)).then((interception) => {
      assert.isNotNull(interception, 'API call confirmed');
    });
  }
);

Given(
  'I intercept a {string} request to {string}',
  (method: string, endpoint: string) => {
    cy.intercept(method, endpoint).as(`${method}_REQUEST`);
  }
);

Then(
  'I confirm the {string} request has a status of {string}',
  (method: string, statusCode: string) => {
    cy.wait(`@${method}_REQUEST`)
      .its('response.statusCode')
      .should('eq', +statusCode);
  }
);

Then(
  'I confirm the {string} request was made to host containing {string}',
  (request: string, hostValue: string) => {
    cy.wait(`@${request}`).then((interception) => {
      expect(interception.request.headers.host).to.include(hostValue);
    });
  }
);

Given('I spy request {string}', (json: string) => {
  let routeMatcher;

  try {
    routeMatcher = JSON.parse(json);
  } catch (error) {
    throw error;
  }

  cy.intercept(routeMatcher).as(getRoute(routeMatcher));
});

Given('I confirm request {string}', (json: string) => {
  let routeMatcher;

  try {
    routeMatcher = JSON.parse(json);
  } catch (error) {
    throw error;
  }

  cy.wait(getWaitRoute(routeMatcher)).then((interception) => {
    assert.isNotNull(interception, 'API call confirmed');
  });
});

Given(
  'I intercept {string} with fixture {string} and add header {string} with value {string}',
  (json: string, fixture: string, headerName: string, headerValue: string) => {
    let routeMatcher;

    try {
      routeMatcher = JSON.parse(json);
    } catch (error) {
      throw error;
    }

    cy.intercept(routeMatcher, {
      headers: {
        [headerName]: headerValue,
      },
    });
  }
);

Given(
  'I verify the {string} body has {string} included',
  (json: string, value: string) => {
    let routeMatcher;

    try {
      routeMatcher = JSON.parse(json);
    } catch (error) {
      throw error;
    }
    cy.wait(getWaitRoute(routeMatcher))
      .its('request.body.Username')
      .should('include', value);
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

Given('I expect an exception', () => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });
});

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

When('I type a new {string} with value {string}', cy.typeInInputHandler);

When('I type a new {string} with random value', (field: string) => {
  cy.typeInInputHandler(field, randomFileName);
});

When('I lose focus on {string} input', (field: string) => {
  cy.findInputField(field).blur();
});

When('I click the {string} tab', (label: string) => {
  cy.findByRole('tab', {
    name: new RegExp(`^${escapeRegExp(label)}$`, 'i'),
  }).click();
});

When('I click the {string}', (id: string) => {
  cy.findByTestId(id).click();
});

When('I click the element with id attribute {string}', (id: string) => {
  cy.get(`#${id}`).click({ force: true });
});

When('I click the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
    timeout: 5000,
  }).click();
});

Then('I press the {string} key', (key: string) => {
  cy.get('body').type(key);
});

When('I click the button containing {string}', cy.clickButtonWithText);

When('I click the button with label {string}', (ariaLabel: string) => {
  cy.findByLabelText(ariaLabel).click();
});

When('I click the button containing random name', () => {
  cy.clickButtonWithText(randomFileName);
});

When('I click the first button containing {string}', (name: string) => {
  cy.findAllByRole('button', {
    name: new RegExp(`${escapeRegExp(name)}`, 'i'),
  })
    .first()
    .click();
});

Then('I see the button containing {string}', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`${escapeRegExp(name)}`, 'i'),
  }).should('exist');
});

Then('I do not see the button containing {string}', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`${escapeRegExp(name)}`, 'i'),
  }).should('not.exist');
});

Then('I see the first button containing {string}', (name: string) => {
  cy.findAllByRole('button', {
    name: new RegExp(`${escapeRegExp(name)}`, 'i'),
  })
    .first()
    .should('exist');
});

Then('I see the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).should('exist');
});

Then('I do not see the {string} button', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).should('not.exist');
});

When('I click the {string} menuitem', (label: string) => {
  cy.findByRole('menuitem', {
    name: new RegExp(`^${escapeRegExp(label)}$`, 'i'),
  }).click();
});

Then('I see the {string} menuitem', (label: string) => {
  cy.findByRole('menuitem', {
    name: new RegExp(`^${escapeRegExp(label)}$`, 'i'),
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
    // We have to force this click because the radio button isn't visible by default
    // and instead has ::before decoration.
    force: true,
  });
});

When('I reload the page', () => {
  cy.reload();
});

Then('I see tab {string}', (search: string) => {
  cy.findAllByRole('tab').first().should('be.visible').contains(search);
});

Then('I see {string}', cy.doesDocumentContainText);

Then('I see {string} files with random names', (count: string) => {
  for (let i = 1; i <= parseInt(count); i++) {
    cy.doesDocumentContainText(`${randomFileName}-${i}`);
  }
});

Then('I do not see {string}', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'))
    .should('not.exist');
});

Then('I see {string} element', (id: string) => {
  cy.findByTestId(id).should('exist');
});

Then('I see placeholder {string}', (message: string) => {
  cy.findByPlaceholderText(message).should('exist');
});

Then('I see the {string} image', (alt: string) => {
  cy.findByAltText(alt).should('exist');
});

Then('I see video with label {string}', (label: string) => {
  cy.get(`video[aria-label="${label}"]`).should('exist');
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

Then('the {string} button is enabled', (name: string) => {
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).should('not.be.disabled');
});

Then('the table should have {string} rows', (value: string) => {
  cy.get('table').find('tbody tr').should('have.length', value);
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
  cy.findInputField('Confirmation Code').clear().type('123456');
});

When('I type a custom password from label {string}', (custom: string) => {
  cy.findByLabelText(custom).type(Cypress.env('VALID_PASSWORD'));
});

When(
  'I type a custom confirm password from label {string}',
  (custom: string) => {
    cy.findByLabelText(custom).type(Cypress.env('VALID_PASSWORD'));
  }
);

When('I type a valid SMS confirmation code', () => {
  // This should be intercepted & mocked
  cy.findInputField('Code *').type('123456');
});

When('I type an invalid confirmation code', () => {
  cy.findInputField('Confirmation Code').clear().type('0000');
});

When('I see one code input', () => {
  cy.get('input').should('have.length', 1);
});

When(
  'I see {string} as the {string} input',
  (custom: string, order: number) => {
    cy.get('input').eq(order).should('have.attr', 'placeholder', custom);
  }
);

When('I dispatch {string} event', (eventName: string) => {
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
  (eventName: string, fixture: string) => {
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

Given('I spy {string} method', (path: string) => {
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
  cy.findByRole('textbox', { name: regex }).type('1234');
});

When('I type a valid confirmation code for attribute confirmation', () => {
  cy.findInputField('New Label').type('1234');
});

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findInputField('New Password').should('exist');
});

When('I type my username with untrimmed spaces', () => {
  cy.findInputField('Username').type(` ${Cypress.env('USERNAME')}+CONFIRMED `);
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

When(
  'I see input with placeholder {string} and type {string}',
  (name: string, value: string) => {
    cy.findByPlaceholderText(name).type(value);
  }
);

Then('I click the submit button', () => {
  /**
   * Submit button text differs on React/Vue vs Angular. Testing for both for
   * now, but we can look to make them consistent on next major release.
   */
  cy.findByRole('button', {
    name: new RegExp(`^((submit)|(send code))$`, 'i'),
  }).click();
});

Then('I click the label containing text {string}', (labelText: string) => {
  cy.contains('label', labelText).should('be.visible').click({ force: true });
});

Then('I confirm {string} error is accessible in password field', () => {
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

Then('I confirm {string} error is accessible in new password field', () => {
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

Then(
  'I hit the {string} key on {string} button',
  (key: string, name: string) => {
    cy.findByRole('button', {
      name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
    }).type(`{${key}}`, { force: true });
  }
);

Then('I see the {string} radio button checked', (label: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(label)}`, 'i')).should(
    'be.checked'
  );
});

When('I upload {string} files with random names', (count: string) =>
  cy.fileInputUpload(randomFileName, parseInt(count))
);

When(
  'I upload a folder {string} with {string} files with random names',
  (folderName: string, count: string) =>
    cy.fileInputUpload(`${folderName}/${randomFileName}`, parseInt(count))
);

When('A network failure occurs', () => {
  cy.intercept('', (req) => {
    req.destroy();
  });
});

Then('I see an error message for network failure', () => {
  cy.get('body', { timeout: 10000 }).should(($body) => {
    const text = $body.text();
    expect(text).to.match(
      /Something went wrong|Failed to fetch|Error|Network error|Unable to load/i
    );
  });
});

Then('I see the {string} link', (name: string) => {
  cy.findByText(name).should('exist');
});

When('I click the {string} link', (name: string) => {
  cy.findByText(name).click();
});

Then('I see the {string} message', (name: string) => {
  cy.findByText(name).should('exist');
});

When('I go back to the previous page', () => {
  cy.go('back');
});

When('I go forward to the next page', () => {
  cy.go('forward');
});
