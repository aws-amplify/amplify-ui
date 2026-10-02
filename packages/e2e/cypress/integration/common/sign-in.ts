/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { When } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I update my country code from {string} to {string}',
  (initialCode: string, nextCode: string) => {
    cy.findByDisplayValue(initialCode).select(nextCode);
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
  cy.env<{ VALID_PASSWORD: string }>(['VALID_PASSWORD']).then(
    ({ VALID_PASSWORD }) => {
      cy.findInputField('Password').type(VALID_PASSWORD);
    }
  );
});
