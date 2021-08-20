import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm at the sign in page", () => {
  cy.visit('/ui/components/authenticator/sign-in-with-email');
});

When('I type the valid email {string}', (email: string) => {
  cy.findByRole('textbox', { name: /email/i }).type(Cypress.env(email));
});

And('I type the valid password {string}', (password: string) => {
  cy.findByLabelText(/password/i).type(Cypress.env(password));
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(message, 'i'));
});
