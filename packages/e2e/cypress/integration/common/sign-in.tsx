/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm using the example {string}", (example: string) => {
  cy.visit(`/ui/components/authenticator/${example}`);
});

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    let loginAlias;
    if (loginMechanism === 'email') {
      loginAlias = `${Cypress.env('USERNAME')}+${status}@${Cypress.env(
        'DOMAIN'
      )}`;
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
    } else {
      loginAlias = `${Cypress.env('USERNAME')}+${status}`;
    }
    cy.findByRole('textbox', { name: new RegExp(loginMechanism, 'i') }).type(
      loginAlias
    );
  }
);

When('I type my password', () => {
  cy.findByLabelText(/password/i).type(Cypress.env('PASSWORD'));
});

When('I click the Sign in button', () => {
  cy.findByRole('button', { name: /Sign in/i }).click();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(message, 'i'));
});
