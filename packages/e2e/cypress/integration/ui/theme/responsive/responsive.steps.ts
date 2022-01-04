import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('the page contains {string}', (search: string) => {
  cy.findByRole('document').contains(search);
});
