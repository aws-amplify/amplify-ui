import { Then } from 'cypress-cucumber-preprocessor/steps';

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
