import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
});

When('I click on the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

And('I type a valid but unverified email {string}', (email: string) => {
  cy.findByRole('textbox', { name: /email/i }).type(Cypress.env(email));
});

And('I type a valid password {string}', (password: string) => {
  cy.findByLabelText(/password/i).type(Cypress.env(password));
});

And('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

And('I click on the first radio button', () => {
  cy.findByRole('radio').click();
});

Then('I will be redirected to the verify user page', () => {
  cy.findByRole('radio').should('exist');
});

Then('I will be redirected to the confirm verify user page', () => {
  cy.findByRole('document').contains(new RegExp('Code *', 'i'));
});

Then('I see {string}', (message: string) => {
  const [messageString, username] = message.split(' ');
  cy.get('body').contains([messageString, Cypress.env(username)].join(' '));
});
