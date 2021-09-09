import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
});

When('I type a valid email {string}', (email: string) => {
  cy.get('[data-amplify-usernamealias]').type(Cypress.env(email));
});

When('I type an invalid email {string}', (email: string) => {
  cy.get('[data-amplify-usernamealias]').type(Cypress.env(email));
});

And('I type an invalid password {string}', (password: string) => {
  cy.get('[data-amplify-password]').type(Cypress.env(password));
});

And('I type a valid password {string}', (password: string) => {
  cy.get('[data-amplify-password]').type(Cypress.env(password));
});

Then('I will be redirected to the confirm totp mfa page', () => {
  cy.get('body').contains('TOTP');
});

Then('I will be redirected to the setup mfa page', () => {
  cy.get('[data-amplify-qrcode]').should('be.visible');
});
