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
const appendStatusToAlias = (status: string) =>
  `${Cypress.env('USERNAME')}+${status === 'UNKNOWN' ? Date.now() : status}`;

Cypress.Commands.add(
  'typeAliasWithStatus',
  { prevSubject: true },
  (inputField: Element, loginMechanism: string, status: string) => {
    const buildAlias = cond([
      [eq('username'), constant(appendStatusToAlias(status))],
      [
        eq('email'),
        constant(`${appendStatusToAlias(status)}@${Cypress.env('DOMAIN')}`),
      ],
      [eq('phone number'), constant(Cypress.env('PHONE_NUMBER'))],
      [eq('preferred username'), constant(appendStatusToAlias(status))],
    ]);

    return cy.wrap(inputField).type(buildAlias(loginMechanism));
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
