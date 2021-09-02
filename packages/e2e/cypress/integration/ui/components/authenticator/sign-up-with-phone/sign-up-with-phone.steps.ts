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

When('I type the phone number {string}', (phone: string) => {
  cy.findByRole('combobox', { name: /country code/i }).select('+1');
  cy.findByRole('textbox', { name: /phone number/i }).type(Cypress.env(phone));
});

And('I type the password {string}', (password: string) => {
  cy.findByLabelText(/^password$/i).type(Cypress.env(password));
});

And('I confirm the password {string}', (password: string) => {
  cy.findByLabelText(/confirm password/i).type(Cypress.env(password));
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(message);
});
