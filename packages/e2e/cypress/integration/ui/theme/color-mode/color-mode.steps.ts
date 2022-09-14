import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see the {string}', (name: string) => {
  cy.findByRole('group', { name }).should('exist');
});

Then('the docs site should be in {string}', (colorMode: string) => {
  cy.findByRole('button', { name: colorMode }).should(
    'have.attr',
    'aria-pressed',
    'true'
  );
});
