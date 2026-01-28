import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I search for {string}', (searchTerm: string) => {
  cy.intercept(/.*places.*/).as('searchResults');
  cy.findByRole('textbox', {
    name: /search/i,
    timeout: 30000,
  }).type(searchTerm);
  cy.wait('@searchResults');
});

When('I select the first search result', () => {
  cy.findAllByRole('listitem', { timeout: 30000 }).first().click();
});

When('I clear the search results', () => {
  cy.findByRole('textbox', {
    name: /search/i,
    timeout: 30000,
  }).trigger('mouseenter');
  /**
   * Adding 'force' as the clear button is hidden until we hover on textbox,
   * and the click action seems to happen before the hover thus failing the check for the clear button element.
   */
  cy.findByRole('button', { name: 'Clear', timeout: 30000 }).click({
    force: true,
  });
});

When('I click on a map marker', () => {
  cy.get('.maplibregl-marker', { timeout: 30000 })
    .first()
    .click({ force: true });
});

Then('I see results for my search term', () => {
  cy.get('.suggestions', { timeout: 30000 }).should('be.visible');
});

Then('I see no search results', () => {
  cy.get('.suggestions', { timeout: 30000 }).should('not.be.visible');
});

Then('the search input is empty', () => {
  cy.findByRole('textbox', {
    name: /search/i,
    timeout: 30000,
  }).should('have.value', '');
});
