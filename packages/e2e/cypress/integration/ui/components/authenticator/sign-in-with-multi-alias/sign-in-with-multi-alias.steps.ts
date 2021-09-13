import { When } from 'cypress-cucumber-preprocessor/steps';

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    cy.findByRole(
      'textbox',
      /username or email or phone number/i
    ).typeAliasWithStatus(loginMechanism, status);
  }
);
