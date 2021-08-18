import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
});

And('I type a valid username {string}', (username: string) => {
  cy.findByRole('textbox', { name: /username/i }).type(Cypress.env(username));
});

And('I type an invalid username {string}', (username: string) => {
  cy.findByRole('textbox', { name: /username/i }).type(Cypress.env(username));
});

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findByRole('textbox', { label: 'New password' }).should('exist');
});

Then('I see {string}', (message: string) => {
  const [messageString, username] = message.split(' ');
  cy.get('body').contains([messageString, Cypress.env(username)].join(' '));
});
