import { Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I see a valid greetings message', () => {
  cy.findByRole('document')
    .contains(new RegExp('^Hello, .+!$', 'i'))
    .should('exist');
});
