import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I will be redirected to the confirm sms mfa page', () => {
  cy.get('[data-amplify-authenticator-confirmsignin]').should('be.visible');
});
