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
  (loginMechanism: string, status: string) => {
    switch (loginMechanism) {
      case 'email':
        return cy.type(
          `${Cypress.env('USERNAME')}+${status}@${Cypress.env('DOMAIN')}`
        );
      case 'phone_number':
        let countryCode;
        if (status === 'CONFIRMED') {
          countryCode = '1';
        } else if (status === 'UNKNOWN') {
          countryCode = '2';
        } else if (status === 'UNCONFIRMED') {
          countryCode = '3';
        }
        return cy.type(`+${countryCode}${Cypress.env('PHONE_NUMBER')}`);
      case 'username':
        return cy.type(`${Cypress.env('USERNAME')}+${status}`);
    }
  }
);
