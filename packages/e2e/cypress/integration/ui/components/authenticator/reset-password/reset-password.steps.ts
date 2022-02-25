import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findInputField('New Password').should('exist');
});

When('I type my new password', () => {
  cy.findInputField('New Password').type(Cypress.env('VALID_PASSWORD'));
});

When('I type a valid code', () => {
  cy.findByPlaceholderText('Code').type('validcode');
});
