import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('{string} checkbox is checked', (checkboxName: string) => {
  cy.findByText(checkboxName)
    .next()
    .should('have.attr', 'data-checked', 'true');
});

Given('{string} layout radio option is selected', (radioOption: string) => {
  cy.findByText(radioOption).next().should('have.attr', 'checked');
});

When('I click the {string} layout radio option', (radioOption: string) => {
  // another span element wraps over this so had to add force:true on check
  cy.findByText(radioOption).next().check({ force: true });
});

When('I toggle {string} checkbox', (checkboxName: string) => {
  // unable to uncheck so added click action instead
  cy.findByText(checkboxName).click();
});

When('I wait for pinpoint messages to sync', () => {
  const analyticsCampaignRegion = 'us-east-1';
  cy.intercept({
    method: 'GET',
    url: `https://pinpoint.${analyticsCampaignRegion}.amazonaws.com/**`,
  }).as('syncPinpointMessages');
  cy.wait('@syncPinpointMessages');
});

Then('the banner has an image', () => {
  cy.findByRole('img', { name: 'In-App Message Image' }).should('exist');
});

Then('I see banner at the {string}', (position: string) => {
  const expectedClass = `amplify-inappmessaging-bannermessage--${position}`;
  cy.findByRole('dialog').should('exist').should('have.class', expectedClass);
});

Then('I see banner as a modal', () => {
  const expectedClass = 'amplify-inappmessaging-modalmessage__dialog';
  cy.findByRole('dialog').should('exist').should('have.class', expectedClass);
});

Then('I see banner as fullscreen', () => {
  const expectedClass = 'amplify-inappmessaging-fullscreenmessage';
  cy.findByRole('dialog').should('exist').should('have.class', expectedClass);
});
