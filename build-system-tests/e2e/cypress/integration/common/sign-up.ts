import { Given, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I click {string}', (text: string) => {
  cy.findByText(text).click();
});

When('I confirm my password', () => {
  cy.env<{ VALID_PASSWORD: string }>(['VALID_PASSWORD']).then(
    ({ VALID_PASSWORD }) => {
      cy.findInputField('Confirm Password')
        .type(VALID_PASSWORD)
        .blur()
        .wait(100);
    }
  );
});
