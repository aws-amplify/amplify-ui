/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { When } from 'cypress-cucumber-preprocessor/steps';

When(
  'I select my country or region code with status {string}',
  (status: string) => {
    const countryOrRegionCodeSelect = cy.findByRole('combobox', {
      name: /country or region code/i,
    });
    if (countryOrRegionCodeSelect) {
      const countryOrRegionCode =
        status === 'CONFIRMED'
          ? '+1'
          : status === 'UNCONFIRMED'
          ? '+7'
          : status === 'UNKNOWN'
          ? '+20'
          : status === 'FORCE_CHANGE_PASSWORD'
          ? '+30'
          : null;

      countryOrRegionCodeSelect.select(countryOrRegionCode);
    }
  }
);

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
