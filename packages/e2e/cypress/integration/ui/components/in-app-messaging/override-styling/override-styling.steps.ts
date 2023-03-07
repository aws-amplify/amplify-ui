import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see the message on the banner with style override', () => {
  cy.findByRole('dialog').should('exist');
  cy.findByRole('dialog')
    .children()
    .should('have.css', 'background-color', 'rgb(250, 235, 215)');
});
