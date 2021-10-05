import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I type an invalid confirmation code', () => {
  cy.findInputField('confirmation_code').type('invalidcode');
});

Then('I see an error alert', () => {
  cy.findByRole('alert').should('exist');
});
