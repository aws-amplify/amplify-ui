import { Given, Then } from 'cypress-cucumber-preprocessor/steps';

let defaultSearchResults = 0;

Given('my default search results is {int}', (searchResults: number) => {
  defaultSearchResults = searchResults;
});

Then('I see results equal to my default search results', () => {
  cy.findByRole('list').children().should('have.length', defaultSearchResults);
});

Then('the search input is not empty', () => {
  cy.findByRole('textbox', {
    name: /search/i,
  })
    .invoke('val')
    .should('not.be.empty');
});
