import { And, Given, Then } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
  cy.get('[data-amplify-authenticator-signin]').should('be.visible');
});

And('I type in the phone number {string}', (phone: string) => {
  cy.findByRole('textbox', { name: /phone number/i }).type(Cypress.env(phone));
});

And('I type in the password {string}', (password: string) => {
  cy.findByLabelText(/password/i).type(Cypress.env(password));
});

And('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

Then('I should see the Force Change Password screen', () => {
  cy.findByRole('document').contains(new RegExp('Change Password', 'i'));
});

Then('I should see error text', () => {
  cy.get('.forceNewPasswordErrorText').should('be.visible');
});
