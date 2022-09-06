import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the page contains {string} section', (search: string) => {
  cy.findByRole('document').contains(search);
});

Then('My url contains {string}', (pathSearch: string) => {
  cy.url().should('include', pathSearch);
});

Then('My page should be reloaded', () => {
  // performance navigation type 1 means the page has been reloaded
  // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigation/type
  cy.window().its('performance.navigation.type').should('equal', 1);
});
