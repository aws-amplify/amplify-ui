import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I dismiss the banner', () => {
  cy.findByRole('button', { name: 'Dismiss message', timeout: 5000 }).click();
});

Then('I do not see the banner', () => {
  cy.findByRole('dialog', { timeout: 5000 }).should('not.exist');
});

Then('the banner has {int} buttons', (buttonCount: number) => {
  const context = cy.findAllByRole('dialog');
  if (buttonCount > 0) {
    context
      .findByRole('group', { timeout: 5000 })
      .children()
      .should('have.length', buttonCount);
  } else {
    context.findByRole('group', { timeout: 5000 }).should('not.exist');
  }
});
