import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I see the same style of marker by default', () => {
  cy.get('g [fill="#4668F2"]').should('have.length', 2);
});
