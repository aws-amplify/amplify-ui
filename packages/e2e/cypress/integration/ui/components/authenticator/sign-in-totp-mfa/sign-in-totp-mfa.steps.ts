import { Then, When } from 'cypress-cucumber-preprocessor/steps';

When('I enter an invalid confirmation code', () => {
  cy.findInputField('code *').type('000000');
});

Then('I will be redirected to the setup totp page', () => {
  cy.get('[data-amplify-qrcode]').should('be.visible');
});
