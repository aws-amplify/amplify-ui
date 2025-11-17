import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I dismiss the banner', () => {
  cy.findByRole('button', { name: 'Dismiss message' }).click();
});

Then('I do not see the banner', () => {
  cy.findByRole('dialog').should('not.exist');
});

Then('the banner has {int} buttons', (buttonCount: number) => {
  const context = cy.findAllByRole('dialog');
  if (buttonCount > 0) {
    context.findByRole('group').children().should('have.length', buttonCount);
  } else {
    context.findByRole('group').should('not.exist');
  }
});
