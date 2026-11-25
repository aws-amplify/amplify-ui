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

Given('Amazon Pinpoint requests are stubbed', () => {
  // Amazon Pinpoint reached end of support on October 30, 2026, and rejects every
  // request. The In-App Messaging library still calls it in the background (for
  // example to record message display and dismiss events), so return minimal
  // successful responses to keep these tests independent of the retired service.
  const pinpointUrl = 'https://pinpoint.*.amazonaws.com/v1/apps/*';
  // Catch-all so no request reaches Pinpoint. Cypress checks the most recently
  // defined intercept first, so the specific stubs below take precedence.
  cy.intercept('https://pinpoint.*.amazonaws.com/**', {
    statusCode: 200,
    body: {},
  });
  cy.intercept(
    { method: 'POST', url: `${pinpointUrl}/events` },
    {
      statusCode: 200,
      body: { Results: {} },
    }
  );
  cy.intercept(
    { method: 'PUT', url: `${pinpointUrl}/endpoints/*` },
    {
      statusCode: 202,
      body: { Message: 'Accepted', RequestID: 'stubbed' },
    }
  );
  cy.intercept(
    { method: 'GET', url: `${pinpointUrl}/endpoints/*/inappmessages` },
    { statusCode: 200, body: { InAppMessageCampaigns: [] } }
  );
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
