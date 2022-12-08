/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I select my country code with status {string}', (status: string) => {
  const countryCodeSelect = cy.findByRole('combobox', {
    name: /country code/i,
  });
  if (countryCodeSelect) {
    const countryCode =
      status === 'CONFIRMED'
        ? '+1'
        : status === 'UNCONFIRMED'
        ? '+7'
        : status === 'UNKNOWN'
        ? '+20'
        : status === 'FORCE_CHANGE_PASSWORD'
        ? '+30'
        : null;

    countryCodeSelect.select(countryCode);
  }
});

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    cy.findInputField(loginMechanism).typeAliasWithStatus(
      loginMechanism,
      status
    );
  }
);

When('I type my password', () => {
  cy.findInputField('Password').type(Cypress.env('VALID_PASSWORD'));
});
