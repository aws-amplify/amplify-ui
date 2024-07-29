import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

Then('I see User Attributes', () => {
  cy.findByRole('document').contains('User Attributes').should('exist');
});

When('I type my "Given Name" as "Testy"', () => {
  cy.findInputField('Given Name').type('Testy');
});

Then('I see "Given Name" attribute as "Testy"', () => {
  cy.findByText('Given Name:').parent().findByText('Testy');
});

Then('I click the "Delete" button for "Given Name"', () => {
  cy.findByText('Given Name')
    .parent()
    .parent()
    .findByRole('button', { name: 'Delete' })
    .click();
});

Then('the "Given Name" attribute should be removed', () => {
  cy.findByText('Given Name:').should('not.exist');
});

When('I type my "Email" as "TESTER2@example.com"', () => {
  cy.findInputField('Email:').type('TESTER2@example.com');
});
