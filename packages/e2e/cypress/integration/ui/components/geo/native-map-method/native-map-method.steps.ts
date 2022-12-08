import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

let mapCenter;

When('I see the map load', () => {
  cy.waitForIdleMap();
  cy.window()
    .its('map')
    .invoke('getCenter')
    .then((startingCenter) => {
      mapCenter = startingCenter;
    });
});

When('I click the button to transition the map', () => {
  cy.findByRole('button', { name: /fly/gi }).click({ force: true });
});

Then('I see the map viewport transition', () => {
  cy.window().its('map').invoke('getCenter').should('not.eq', mapCenter);
});
