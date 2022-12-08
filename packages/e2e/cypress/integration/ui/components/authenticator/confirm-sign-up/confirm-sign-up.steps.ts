import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see an error alert', () => {
  cy.findByRole('alert').should('exist');
});
