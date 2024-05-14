import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

Then('I change the theme to {string}', (name) => {
  cy.findByTestId('docs-home-section-themable')
    .scrollIntoView() // Scroll into view first, since NextJS lazy loads page
    .findByRole('button', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') })
    .should('be.visible')
    .click({ scrollBehavior: 'center' });
});

Then(
  '{string} button has background color {string}',
  (button: string, color: string) => {
    cy.findByTestId('docs-home-section-themable')
      .scrollIntoView()
      .findByRole('button', {
        name: new RegExp(`^${escapeRegExp(button)}$`, 'i'),
      })
      .should('have.css', 'background-color', color);
  }
);
