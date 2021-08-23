import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm at the sign in page", () => {
  cy.visit('/ui/components/authenticator/auth-with-multi-alias');
});

When('I type the valid login mechanism {string}', (alias: string) => {
  cy.findByRole('textbox', { name: /username or email or phone number/i }).type(
    Cypress.env(alias)
  );
});

And('I type the valid password {string}', (password: string) => {
  cy.findByLabelText(/password/i).type(Cypress.env(password));
});

And('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(message, 'i'));
});
