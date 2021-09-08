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
  cy.findByPlaceholderText(/password/i).type(Cypress.env(password));
});
