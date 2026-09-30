import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I type my current password', () => {
  cy.env<{ VALID_PASSWORD: string }>(['VALID_PASSWORD']).then(
    ({ VALID_PASSWORD }) => {
      cy.findInputField('Current Password').type(VALID_PASSWORD);
    }
  );
});
