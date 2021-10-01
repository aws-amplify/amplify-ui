import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I enter an invalid confirmation code', () => {
  // Wait for QR code to render before entering code
  cy.get('[data-amplify-qrcode]').then(() => {
    cy.findInputField('code *').type('000000');
  });
});

Then('I will be redirected to the setup totp page', () => {
  cy.get('[data-amplify-qrcode]').should('be.visible');
});
