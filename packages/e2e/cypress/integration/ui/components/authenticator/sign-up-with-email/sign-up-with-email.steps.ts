import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm using the example {string}", (example: string) => {
  cy.visit(example);
});

And('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

Then('I see {string} as an input field', (name: string) => {
  cy.findByRole('textbox', { name }).should('exist');
});

Then("I don't see {string} as an input field", (name: string) => {
  cy.findByRole('textbox', { name }).should('not.exist');
});

When('I type the email {string}', (email: string) => {
  cy.findByRole('textbox', { name: /email/i }).type(
    Date.now() + Cypress.env(email)
  );
});

And('I type the password {string}', (password: string) => {
  cy.findByPlaceholderText(/^password$/i).type(Cypress.env(password));
});

And('I confirm the password {string}', (password: string) => {
  cy.findByPlaceholderText(/confirm password/i).type(Cypress.env(password));
});
