import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see the Force Change Password screen', () => {
  cy.findByRole('document').contains(new RegExp('Change Password', 'i'));
});

Then('I should see error text', () => {
  cy.get('.forceNewPasswordErrorText').should('be.visible');
});
