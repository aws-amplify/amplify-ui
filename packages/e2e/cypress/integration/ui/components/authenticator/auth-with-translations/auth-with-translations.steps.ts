import { Then, And } from 'cypress-cucumber-preprocessor/steps';
import { translations } from '@aws-amplify/ui';

Then('Sign In header is translated in Japanese', () => {
  cy.findByRole('heading', {
    name: translations.ja['Sign in to your account'].trim(),
  });
});

And('Email input is translated in Japanese', () => {
  cy.findInputField(translations.ja['Email'].trim());
});

And('Password input is translated in Japanese', () => {
  cy.findByPlaceholderText(translations.ja['Password'].trim());
});

And('Forgot Password button is translated in Japanese', () => {
  cy.findByRole('button', {
    name: translations.ja['Forgot your password? '].trim(),
  });
});

And('Create Account button is translated in Japanese', () => {
  cy.findByRole('button', { name: translations.ja['Create Account'].trim() });
});
