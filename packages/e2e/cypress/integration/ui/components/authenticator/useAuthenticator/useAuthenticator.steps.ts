import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I see a valid greetings message', () => {
  cy.findByRole('document')
    .contains(new RegExp('^Hello, .+!$', 'i'))
    .should('exist');
});
