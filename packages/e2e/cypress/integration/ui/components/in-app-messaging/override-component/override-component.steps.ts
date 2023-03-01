import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see the custom component', () => {
  cy.get('[data-testid="custom-banner"]').should('exist');
});

Then('I do not see the custom component', () => {
  cy.get('[data-testid="custom-banner"]').should('not.exist');
});
