// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import { cond, constant, eq, escapeRegExp } from 'lodash/fp';

/**
 * Using Date.now() for UNKNOWN status gives us a unique and unused
 * alias
 */
const appendStatusToAlias = (username: string, status: string) =>
  `${username}+${status === 'UNKNOWN' ? Date.now() : status}`;

Cypress.Commands.add(
  'typeAliasWithStatus',
  { prevSubject: true },
  (inputField: Element, loginMechanism: string, status: string) => {
    // Cypress 16 removed the synchronous Cypress.env(). Read the sensitive
    // credential values asynchronously via cy.env() so they stay in the
    // Node/test-runner context and are never exposed to the browser.
    return cy
      .env<{
        USERNAME: string;
        DOMAIN: string;
        PHONE_NUMBER: string;
      }>(['USERNAME', 'DOMAIN', 'PHONE_NUMBER'])
      .then(({ USERNAME, DOMAIN, PHONE_NUMBER }) => {
        const buildAlias = cond([
          [eq('username'), constant(appendStatusToAlias(USERNAME, status))],
          [
            eq('email'),
            constant(`${appendStatusToAlias(USERNAME, status)}@${DOMAIN}`),
          ],
          [eq('phone number'), constant(PHONE_NUMBER)],
          [
            eq('preferred username'),
            constant(appendStatusToAlias(USERNAME, status)),
          ],
        ]);

        return cy.wrap(inputField).type(buildAlias(loginMechanism));
      });
  }
);

Cypress.Commands.add('findInputField', (field: string) => {
  const passwordFieldNames = ['password', 'new password', 'confirm password'];
  const isPasswordField = passwordFieldNames.includes(field.toLowerCase());
  const regexString = `^(enter your )?${escapeRegExp(field)}$`;
  const regex = new RegExp(regexString, 'i');

  if (isPasswordField) {
    return cy.findAllByLabelText(regex);
  } else {
    return cy.findByRole('textbox', { name: regex });
  }
});
