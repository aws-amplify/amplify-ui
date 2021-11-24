import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I see an error alert', () => {
  cy.findByRole('alert').should('exist');
});
