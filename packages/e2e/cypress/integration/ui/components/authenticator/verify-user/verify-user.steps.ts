import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I click on the first radio button', () => {
  cy.findByRole('radio').click();
});

Then('I will be redirected to the verify user page', () => {
  cy.findByRole('radio').should('exist');
});

Then('I will be redirected to the confirm verify user page', () => {
  cy.findByRole('document').contains(new RegExp('Code *', 'i'));
});
