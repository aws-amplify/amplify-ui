import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findInputField('New Password').should('exist');
});

When('I type my new password', () => {
  cy.findInputField('New Password').type(Cypress.env('VALID_PASSWORD'));
});

Then('I click the submit button', () => {
  /**
   * Submit button text differs on React/Vue vs Angular. Testing for both for
   * now, but we can look to make them consistent on next major release.
   */
  cy.findByRole('button', {
    name: new RegExp(`^((submit)|(send code))$`, 'i'),
  }).click();
});

When('I type a valid code', () => {
  /**
   * Confirmation code differs on React/Vue vs Angular. Testing for both for
   * now, but we can look to make them consistent on next major release.
   */
  const regex = new RegExp(`^(confirmation )?code( *)?`, 'i');
  cy.findByRole('spinbutton', { name: regex }).type('1234');
});
