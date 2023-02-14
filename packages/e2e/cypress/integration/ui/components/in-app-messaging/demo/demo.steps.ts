import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('{string} checkbox is checked', (checkboxName: string) => {
  cy.findByText(checkboxName)
    .next()
    .should('have.attr', 'data-checked', 'true');
});

Given('{string} layout radio option is selected', (radioOption: string) => {
  cy.findByText(radioOption).next().should('have.attr', 'checked');
});

When('I click the {string} layout radio option', (radioOption: string) => {
  // another span element wraps over this so had to add force:true on check
  cy.findByText(radioOption).next().check({ force: true });
});

When('I uncheck {string} checkbox', (checkboxName: string) => {
  // unable to uncheck so added click action instead
  cy.findByText(checkboxName).click();
});

Then('I see banner on the top', () => {
  cy.findByRole('dialog').should('exist');
  cy.findByRole('dialog').should('have.css', 'top', '0px');
});

Then('I see banner as a modal', () => {
  cy.findByRole('dialog').should('exist');
  cy.findByRole('dialog').parent().should('have.css', 'inset', '0px');
});
