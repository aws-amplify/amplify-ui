import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

Then('I type {string}', (message: string) => {
  cy.findByTestId('text-input').type(message);
});

Then('I click the send message button', () => {
  cy.get("[type='submit']").click();
});

Then('I see {string} in the text input', (message: string) => {
  cy.get('[data-testid="text-input"]')
    .find('textarea')
    .should('have.value', message);
});

Then('I click the {string} prompt', (name: string) => {
  cy.wait(2500); // todo: remove this once we figure out what's causing re-render
  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).click();
});
