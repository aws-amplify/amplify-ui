import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I search for {string}', (searchTerm: string) => {
  cy.intercept(/.*places.*/).as('searchResults');
  cy.findByRole('textbox', {
    name: /search/i,
  }).type(searchTerm);
  cy.wait('@searchResults');
});

When('I select the first search result', () => {
  cy.findAllByRole('listitem').first().click();
});

When('I clear the search results', () => {
  cy.findByRole('textbox', {
    name: /search/i,
  }).trigger('mouseenter');
  cy.findByRole('button', { name: 'Clear' }).click();
});

Then('I see results for my search term', () => {
  cy.get('.suggestions').should('be.visible');
});

Then('I see no search results', () => {
  cy.get('.suggestions').should('not.be.visible');
});

Then('the search input is empty', () => {
  cy.findByRole('textbox', {
    name: /search/i,
  }).should('have.value', '');
});
