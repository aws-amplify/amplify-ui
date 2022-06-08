import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I see a popup about the marker appear', () => {
  cy.findByRole('heading', { name: 'Marker Information' }).should('exist');
});

When('I close the popup box', () => {
  cy.findByRole('button', { name: 'Close popup' }).click();
});

Then('I no longer see the popup', () => {
  cy.findByRole('heading', { name: 'Marker Information' }).should('not.exist');
});
