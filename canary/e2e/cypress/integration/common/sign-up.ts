import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

When('I confirm my password', () => {
  cy.findInputField('Confirm Password')
    .type(Cypress.env('VALID_PASSWORD'))
    .blur()
    .wait(100);
});
