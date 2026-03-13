import { Then, When, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('I intercept passkey registration prompt', () => {
  // Disable WebAuthn first to clean up any existing authenticators
  cy.wrap(
    Cypress.automation('remote:debugger:protocol', {
      command: 'WebAuthn.disable',
      params: {},
    })
      .catch(() => {
        // Ignore error if already disabled
      })
      .then(() => {
        return Cypress.automation('remote:debugger:protocol', {
          command: 'WebAuthn.enable',
          params: {},
        });
      })
      .then(() => {
        return Cypress.automation('remote:debugger:protocol', {
          command: 'WebAuthn.addVirtualAuthenticator',
          params: {
            options: {
              protocol: 'ctap2',
              transport: 'internal',
              hasResidentKey: true,
              hasUserVerification: true,
              isUserVerified: true,
              automaticPresenceSimulation: true,
            },
          },
        });
      })
      .then((result: any) => {
        return result.authenticatorId;
      })
  ).as('authenticatorId');
});

Given('I cleanup passkey mock', () => {
  cy.get('@authenticatorId').then((authenticatorId) => {
    Cypress.automation('remote:debugger:protocol', {
      command: 'WebAuthn.removeVirtualAuthenticator',
      params: {
        authenticatorId,
      },
    }).then(() => {
      Cypress.automation('remote:debugger:protocol', {
        command: 'WebAuthn.disable',
        params: {},
      });
    });
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
