import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I intercept passkey registration prompt', () => {
  // Mock WebAuthn credential creation
  cy.window().then((win) => {
    win.navigator.credentials = {
      create: cy.stub().resolves({
        id: 'mock-credential-id',
        type: 'public-key',
        rawId: new ArrayBuffer(8),
      }),
    } as any;
  });
});

When('I type a valid email confirmation code', () => {
  cy.findInputField('Code *').type('123456');
});

When('I type an invalid confirmation code', () => {
  cy.findInputField('Code *').type('000000');
});

Then('I will be redirected to the select auth method page', () => {
  cy.get('[data-amplify-authenticator-selectauthmethod]').should('be.visible');
});

Then('I do not see {string}', (text: string) => {
  cy.contains(text).should('not.exist');
});

Then('the email field is visible', () => {
  cy.findInputField('Email').should('be.visible');
});

Then('the password field is not visible', () => {
  cy.findInputField('Password').should('not.exist');
});
