import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I type my current password', () => {
  cy.findInputField('Current Password').type(Cypress.env('VALID_PASSWORD'));
});
