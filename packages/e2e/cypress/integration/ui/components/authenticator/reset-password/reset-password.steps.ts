import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findByRole('textbox', { label: 'New password' }).should('exist');
});
