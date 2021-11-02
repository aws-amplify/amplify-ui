import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I type a valid confirmation code', () => {
  // This should be intercepted & mocked
  cy.findByLabelText('Confirmation Code').type('validcode');
});

When('I type an invalid confirmation code', () => {
  cy.findInputField('confirmation_code').type('invalidcode');
});

Then('I see an error alert', () => {
  cy.findByRole('alert').should('exist');
});
