import { And, Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Then('I will be redirected to the confirm totp mfa page', () => {
  cy.get('body').contains('TOTP');
});

Then('I will be redirected to the setup mfa page', () => {
  cy.get('[data-amplify-qrcode]').should('be.visible');
});
