import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('the page contains filtered buttons', () => {
  cy.findAllByTestId('filtered-item')
    .should('have.length', 3)
    .should('have.css', 'background-color', 'rgb(0, 0, 255)')
    .first()
    .should('have.text', 'Super')
    .next()
    .should('have.text', 'Admin')
    .next()
    .should('have.text', 'Generic');
});

Then('the page contains sorted buttons', () => {
  cy.findAllByTestId('sorted-item')
    .should('have.length', 3)
    .first()
    .should('have.text', 'User1')
    .next()
    .should('have.text', 'User2')
    .next()
    .should('have.text', 'User3');
});
