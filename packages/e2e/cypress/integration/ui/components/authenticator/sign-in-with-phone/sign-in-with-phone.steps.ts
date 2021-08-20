import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm at the sign in page", () => {
  cy.visit('ui/components/authenticator/sign-in-with-phone');
});

When('I type the valid phone number {string}', (phoneNumber: string) => {
  cy.findByRole('textbox', { name: /phone number/i }).type(
    Cypress.env(phoneNumber)
  );
});

And('I type the valid password {string}', (password: string) => {
  cy.findByLabelText(/password/i).type(Cypress.env(password));
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(message, 'i'));
});
