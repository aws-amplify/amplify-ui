import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

Then('I see User Attributes', () => {
  cy.findByRole('document').contains('User Attributes').should('exist');
});

Then('I see "Locale" attribute as "Testville"', () => {
  cy.findByText('Locale:').parent().findByText('Testville');
});

Then('I see "Given Name" attribute as "Testy Tester"', () => {
  cy.findByText('Given Name:').parent().findByText('Testy Tester');
});

Then('I click the "Delete" button for "Given Name"', () => {
  cy.findByText('Given Name')
    .parent()
    .parent()
    .findByRole('button', { name: 'Delete' })
    .click();
});

Then('I click the "Delete" button for "Locale"', () => {
  cy.findByText('Locale')
    .parent()
    .parent()
    .findByRole('button', { name: 'Delete' })
    .click();
});

Then('the "Given Name" attribute should be removed', () => {
  cy.findByText('Given Name:').should('not.exist');
});

Then('the "Locale" attribute should be removed', () => {
  cy.findByText('Locale:').should('not.exist');
});

When(
  'I type my {string} as {string}',
  (userAttribute: string, value: string) => {
    cy.findInputField(userAttribute).type(value);
  }
);
