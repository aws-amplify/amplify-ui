import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I type an invalid SMS code', () => {
  cy.findInputField('Code *').type('0000');
});

Then('I will be redirected to the confirm sms mfa page', () => {
  cy.get('[data-amplify-authenticator-confirmsignin]').should('be.visible');
});
