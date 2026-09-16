import { When } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    cy.findInputField(loginMechanism).typeAliasWithStatus(
      loginMechanism,
      status
    );
  }
);

When('I type my password', () => {
  cy.env<{ VALID_PASSWORD: string }>(['VALID_PASSWORD']).then(
    ({ VALID_PASSWORD }) => {
      cy.findInputField('Password').type(VALID_PASSWORD);
    }
  );
});
