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

Cypress.Commands.add(
  'typeAliasWithStatus',
  { prevSubject: true },
  (inputField: Element, loginMechanism: string, status: string) => {
    let loginAlias;
    if (loginMechanism === 'email') {
      loginAlias = `${Cypress.env('USERNAME')}+${
        status === 'UNKNOWN' ? Date.now() : status
      }@${Cypress.env('DOMAIN')}`;
    } else if (loginMechanism === 'phone number') {
      let countryCode;
      if (status === 'CONFIRMED') {
        countryCode = '1';
      } else if (status === 'UNKNOWN') {
        countryCode = '2';
      } else if (status === 'UNCONFIRMED') {
        countryCode = '3';
      }

      loginAlias = `+${countryCode}${Cypress.env('PHONE_NUMBER')}`;
    } else if ((loginMechanism = 'username')) {
      loginAlias = `${Cypress.env('USERNAME')}+${
        status === 'UNKNOWN' ? Date.now() : status
      }`;
    }

    return cy.wrap(inputField).type(loginAlias);
  }
);
