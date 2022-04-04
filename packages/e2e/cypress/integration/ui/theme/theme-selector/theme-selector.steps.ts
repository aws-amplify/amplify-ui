import { And } from 'cypress-cucumber-preprocessor/steps';
import { escapeRegExp } from 'lodash';

And('I change the theme to {string}', (name) => {
  cy.findByRole('button', {
    name: new RegExp(`${escapeRegExp(name)}`, 'i'),
  })
    .should('be.visible')
    .click({ scrollBehavior: 'center' });
});

And(
  '{string} button has background color {string}',
  (button: string, color: string) => {
    cy.findByRole('button', {
      name: new RegExp(`^${escapeRegExp(button)}$`, 'i'),
    }).should('have.css', 'background-color', color);
  }
);
