import { translations } from '@aws-amplify/ui';
import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

When(
  'I click the {string} tab in {string}',
  (label: string, language: string) => {
    cy.findByRole('tab', {
      name: new RegExp(
        `^${escapeRegExp(translations[language][label]).trim()}$`,
        'i'
      ),
    }).click();
  }
);

Then(
  'the {string} header is in {string}',
  (label: string, language: string) => {
    cy.findByRole('heading', {
      name: translations[language][label].trim(),
    });
  }
);

Then('the {string} input is in {string}', (label: string, language: string) => {
  cy.findByLabelText(translations[language][label].trim());
});

Then(
  'the {string} input is in {string} and I type the wrong username or password',
  (label: string, language: string) => {
    cy.findByLabelText(translations[language][label].trim()).type(
      'UNKNOWN@UNKNOWN.com'
    );
  }
);

Then(
  'the {string} button is in {string} and I click it',
  (label: string, language: string) => {
    cy.findByRole('button', {
      name: translations[language][label].trim(),
    }).click();
  }
);

Then(
  'the {string} button is in {string}',
  (label: string, language: string) => {
    cy.findByRole('button', {
      name: translations[language][label].trim(),
    });
  }
);

When(
  'I type {string} in the {string} input in {string}',
  (value: string, label: string, language: string) => {
    // Cypress 16 changed the default `keystrokeDelay` from 10ms to 0, so
    // keystrokes are dispatched back-to-back without yielding to the event
    // loop. For an Authenticator input whose value is driven by the async
    // state machine, the framework's controlled-value tracker can miss the
    // final `input` event, leaving the committed form value out of sync with
    // the DOM. This bites the confirm-password field specifically: as the last
    // field typed it never receives a focus change to flush it, so the machine
    // keeps reporting "Your passwords must match" and Create Account stays
    // disabled. Blurring dispatches the recovered change so the controlled
    // value and cross-field validation settle before the next step — matching
    // the passing `I confirm my password` step and staying framework-agnostic
    // (angular/react/vue/svelte).
    cy.findByLabelText(translations[language][label].trim()).type(value).blur();
  }
);
