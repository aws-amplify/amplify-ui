import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given("I'm at the url {string}", (url: string) => {
  cy.visit(url);
});

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    let loginAlias;
    if (loginMechanism === 'email') {
      loginAlias = `${Cypress.env('USERNAME')}+${status}@${Cypress.env(
        'DOMAIN'
      )}`;
    } else if (loginMechanism === 'phone number') {
      loginAlias = Cypress.env('PHONE_NUMBER');
    } else {
      loginAlias = `${Cypress.env('USERNAME')}+${status}`;
    }
    cy.findByRole('textbox', { name: new RegExp(loginMechanism, 'i') }).type(
      loginAlias
    );
  }
);

When('I type my password', () => {
  cy.findByLabelText(/password/i).type(Cypress.env('PASSWORD'));
});

When('I click the {string} button', (name: string) => {
  cy.findByRole('button', { name: new RegExp(name, 'i') }).click();
});

Then('I see {string}', (message: string) => {
  cy.findByRole('document').contains(new RegExp(message, 'i'));
});
