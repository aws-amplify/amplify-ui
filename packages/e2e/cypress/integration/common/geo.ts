import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Wait for the map to be fully loaded and idle.
 * This is necessary because MapView renders null until fetchAuthSession() completes,
 * which can take longer in CI environments.
 */
Given('the map is loaded', () => {
  // Wait for the map container to have content (not just an empty div)
  cy.get('.maplibregl-map', { timeout: 30000 }).should('exist');
  // Wait for the map to be idle (set by _app.page.tsx)
  cy.window().its('idleMap', { timeout: 30000 }).should('eq', true);
});

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
  /**
   * Adding 'force' as the clear button is hidden until we hover on textbox,
   * and the click action seems to happen before the hover thus failing the check for the clear button element.
   */
  cy.findByRole('button', { name: 'Clear' }).click({ force: true });
});

When('I click on a map marker', () => {
  cy.get('.maplibregl-marker').first().click({ force: true });
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
