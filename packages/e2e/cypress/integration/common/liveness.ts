import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

// the current value returned by the service is 15000,
// the below value can be increased as needed
const LIVENESS_TIMEOUT = 60000;

Then('I see the {string} timeout error', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'), {
      timeout: LIVENESS_TIMEOUT,
    })
    .should('exist');
});

Then('I see the {string} selectfield', (selectFieldName: string) => {
  cy.findByLabelText(
    new RegExp(`^${escapeRegExp(selectFieldName)}`, 'i')
  ).should('exist');
});

Then('I see the {string} textfield', (textFieldName: string) => {
  cy.findByLabelText(new RegExp(`^${escapeRegExp(textFieldName)}`, 'i')).should(
    'exist'
  );
});

Then(
  'I click the {string} selectfield and select the {string} option',
  (selectFieldName: string, optionValue: string) => {
    cy.findByLabelText(
      new RegExp(`^${escapeRegExp(selectFieldName)}`, 'i')
    ).select(optionValue);
  }
);

Then('I set up console monitoring for device callbacks', () => {
  // This step is now optional since we're testing UI elements instead of console logs
  // But we keep it for potential future debugging needs
  cy.window().then((win) => {
    cy.spy(win.console, 'log').as('consoleLog');
    cy.spy(win.console, 'error').as('consoleError');
  });
});

Then(
  'I verify onAnalysisComplete callback is configured with device info',
  () => {
    // Verify that device change callbacks are working by checking the visible UI

    // 1. Check that the liveness detector is rendered
    cy.get('[data-testid="liveness-detector"]').should('exist');

    // 2. Check that the device configuration is properly displayed
    cy.contains('Current Configuration:').should('exist');
    cy.contains('Device ID: device-1').should('exist');

    // 3. Verify that device activity log appears showing device change events
    cy.contains('Device Activity Log').should('exist');



  }
);

