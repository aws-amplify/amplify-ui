import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
});

When('I click on the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

And('I type a valid username {string}', (username: string) => {
  cy.findByRole('textbox', { name: /username/i }).type(Cypress.env(username));
});

And('I type an invalid username {string}', (username: string) => {
  cy.findByRole('textbox', { name: /username/i }).type(Cypress.env(username));
});

And('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

Then('I will be redirected to the confirm forgot password page', () => {
  cy.findByRole('textbox', { label: 'New password' }).should('exist');
});

Then('I see {string}', (message: string) => {
  const [messageString, username] = message.split(' ');
  cy.get('body').contains([messageString, Cypress.env(username)].join(' '));
});
