import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

Then('I see the map', () => {
  // Take screenshot and log page state
  cy.screenshot('before-map-check', { capture: 'fullPage' });

  cy.document().then((doc) => {
    console.log('=== MAP CHECK DEBUG ===');
    console.log('Looking for .maplibregl-canvas');
    console.log('Body classes:', doc.body.className);
    console.log('Body children count:', doc.body.children.length);
    const mapCanvas = doc.querySelector('.maplibregl-canvas');
    const mapContainer = doc.querySelector('.maplibregl-map');
    const nextDiv = doc.querySelector('#__next');
    console.log('Found .maplibregl-canvas:', !!mapCanvas);
    console.log('Found .maplibregl-map:', !!mapContainer);
    console.log('Found #__next:', !!nextDiv);
    if (nextDiv) {
      console.log('#__next innerHTML length:', nextDiv.innerHTML.length);
      console.log('#__next text:', nextDiv.innerText.substring(0, 300));
    }
    console.log('======================');
  });

  // Wait for the map canvas to be rendered
  cy.get('.maplibregl-canvas', { timeout: 30000 }).should('exist');
  cy.findByRole('textbox', {
    name: /search/i,
    timeout: 30000,
  }).should('exist');
});

When('I search for {string}', (searchTerm: string) => {
  cy.intercept(/.*places.*/).as('searchResults');
  cy.findByRole('textbox', {
    name: /search/i,
    timeout: 30000,
  })
    .should('be.visible')
    .type(searchTerm);
  cy.wait('@searchResults');
});

When('I select the first search result', () => {
  cy.findAllByRole('listitem').first().click();
});

When('I clear the search results', () => {
  cy.findByRole('textbox', {
    name: /search/i,
    timeout: 30000,
  })
    .should('be.visible')
    .trigger('mouseenter');
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
    timeout: 30000,
  })
    .should('be.visible')
    .should('have.value', '');
});
