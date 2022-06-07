import { And } from 'cypress-cucumber-preprocessor/steps';

And('I confirm {string} error is accessible', () => {
  // input field should be invalid
  cy.findInputField('Password')
    .should('have.attr', 'aria-invalid')
    .should('equal', 'true');

  // get aria-describedBy value
  cy.findInputField('Password')
    .should('have.attr', 'aria-describedBy')
    .as('describedBy');

  // get the error message id value
  cy.findAllByText('Password must have numbers')
    .parent() // error messages are collected in its parent div
    .should('have.attr', 'id')
    .as('errorId');

  cy.get('@describedBy').then((describedBy) => {
    cy.get('@errorId').then((errorId) => {
      // two `id`s should equal for the message to be accessible
      expect(describedBy).equals(errorId);
    });
  });
});
