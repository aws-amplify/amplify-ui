import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let markerPosition;

When('I see the position of a map marker', () => {
  cy.waitForIdleMap();
  cy.get('.maplibregl-marker').then(($marker) => {
    cy.wrap($marker).should('have.length', 1);
    markerPosition = $marker.get(0).getBoundingClientRect().toJSON();
  });
});

When('I click a button to move the map marker', () => {
  cy.findByRole('button', { name: 'Move Marker' }).click();
});

Then('I see the marker position update', () => {
  cy.get('.maplibregl-marker').then(($marker) => {
    cy.wrap($marker.get(0).getBoundingClientRect().toJSON()).should(
      'not.eq',
      markerPosition
    );
  });
});
