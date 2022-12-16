import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { Decoder } from '@nuintun/qrcode';

const qrcode = new Decoder();

When('I enter an invalid confirmation code', () => {
  // Wait for QR code to render before entering code
  cy.get('[data-amplify-qrcode]').then(() => {
    cy.findInputField('code *').type('000000');
  });
});

Then('I will be redirected to the setup totp page', () => {
  cy.get('[data-amplify-qrcode]').should('be.visible');
});

Then('I check to see if QR code is correct', () => {
  cy.get('img').then(($el) => {
    const imagePath = $el[0]?.currentSrc;
    return qrcode.scan(imagePath).then((decode) => {
      expect(decode.data).to.contain('otpauth://totp/My%20Web%20App');
    });
  });
});
