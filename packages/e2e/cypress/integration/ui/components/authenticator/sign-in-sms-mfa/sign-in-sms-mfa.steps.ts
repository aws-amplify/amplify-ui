import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
  cy.get('[data-amplify-authenticator-signin]').should('be.visible');
});

When('I type a valid phone number {string}', (phoneNumber: string) => {
  cy.get('[data-amplify-usernamealias]').type(Cypress.env(phoneNumber));
});

When('I type an invalid username {string}', (phoneNumber: string) => {
  cy.get('[data-amplify-usernamealias]').type(Cypress.env(phoneNumber));
});

And('I type an invalid password {string}', (password: string) => {
  cy.get('[data-amplify-password]').type(Cypress.env(password));
});

And('I type a valid password {string}', (password: string) => {
  cy.get('[data-amplify-password]').type(Cypress.env(password));
});

Then('I will be redirected to the confirm sms mfa page', () => {
  cy.get('[data-amplify-authenticator-confirmsignin]').should('be.visible');
});

// TODO - this test is failing in the new Authenticator until we add in the error handling in the component
Then('I see {string}', (message: string) => {
  const [messageString, username] = message.split(' ');
  cy.get('body').contains([messageString, Cypress.env(username)].join(' '));
});
