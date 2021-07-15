import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const now = Date.now();
const randomNumber = window.crypto.getRandomValues(new Uint32Array(1))[0];
const password = `test-${randomNumber}`;

Given("I'm running the example {string}", (url) => {
  cy.visit(url);
});

And('I click {string}', (text) => {
  cy.findByText(text).click();
});

When('I type a new username', () => {
  cy.findByRole('textbox', { name: /username/i }).type(`test-${now}`);
});

And('I type a new password', () => {
  cy.findByLabelText(/^password$/i).type(`${password}`);
});

And('I type a new confirm password', () => {
  cy.findByLabelText(/^confirm password$/i).type(`${password}`);
});

And('I type the email {string}', (email) => {
  cy.findByLabelText('Email address').type(email);
});

And('I type the phone number {string}', (phone) => {
  cy.findByLabelText('Phone number').type(phone);
});

And('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name }).click();
});

Then('I see {string}', (message: string) => {
  cy.get('body').contains(message);
});
