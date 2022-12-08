import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

let defaultSearchResults = 0;

Given('my default search results is {int}', (searchResults: number) => {
  defaultSearchResults = searchResults;
});

When('I press the enter key', () => {
  cy.findByRole('textbox', {
    name: /search/i,
  }).type('{enter}');
});

Then('I see markers equal to my default search results', () => {
  cy.get('.maplibregl-marker').should('have.length', defaultSearchResults);
});

Then('I see one marker', () => {
  cy.get('.maplibregl-marker').should('have.length', 1);
});

Then('I see an information popup', () => {
  cy.findByRole('button', { name: 'Close popup' }).should('be.visible');
});

Then('I see no map markers', () => {
  cy.get('.maplibregl-marker').should('have.length', 0);
});
