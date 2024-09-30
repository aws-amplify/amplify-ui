import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'cypress/types/lodash';

Then('I type {string}', (message: string) => {
  cy.wait(1000); // todo: remove this once we figure out what's causing re-render
  cy.findByTestId('text-input').type(message);
});

Then('I click the send message button', () => {
  cy.get("[type='submit']").click();
});

Then('I see {string} in the text input', (message: string) => {
  cy.findByTestId('text-input').should('include', message);
});

Then('I click the {string} prompt', (name: string) => {
  cy.wait(1000); // todo: remove this once we figure out what's causing re-render
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).click();
});
