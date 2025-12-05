import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('{string} checkbox is checked', (checkboxName: string) => {
  cy.findByRole('checkbox', { name: checkboxName, timeout: 5000 }).should(
    'be.checked'
  );
});
Given('{string} checkbox is unchecked', (checkboxName: string) => {
  cy.findByRole('checkbox', { name: checkboxName, timeout: 5000 }).should(
    'not.be.checked'
  );
});

Given('the {string} layout radio option is selected', (radioOption: string) => {
  cy.findByRole('radio', { name: radioOption, timeout: 5000 }).should(
    'be.checked'
  );
});

When('I click the {string} layout radio option', (radioOption: string) => {
  cy.findByRole('radio', { name: radioOption, timeout: 5000 }).click();
});

When('I toggle {string} checkbox', (checkboxName: string) => {
  cy.findByRole('checkbox', { name: checkboxName, timeout: 5000 }).click();
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
  cy.findByRole('img', { name: 'In-App Message Image', timeout: 5000 }).should(
    'exist'
  );
});

Then('I see a {string} banner dialog', (type: string) => {
  cy.findByRole('dialog', { timeout: 5000 })
    .should('exist')
    .should('have.attr', 'data-testid', `inappmessaging-${type}banner-dialog`);
});

Then('I see a {string} dialog', (type: string) => {
  cy.findByRole('dialog', { timeout: 5000 })
    .should('exist')
    .should('have.attr', 'data-testid', `inappmessaging-${type}-dialog`);
});

Then('I wait for {int} ms', (timeout: number) => {
  cy.wait(timeout);
});
