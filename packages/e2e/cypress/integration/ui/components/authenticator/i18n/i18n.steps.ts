import { translations } from '@aws-amplify/ui';
import { And, Then, When } from 'cypress-cucumber-preprocessor/steps';
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

And('the {string} input is in {string}', (label: string, language: string) => {
  cy.findByPlaceholderText(translations[language][label].trim());
});

And('the {string} button is in {string}', (label: string, language: string) => {
  cy.findByRole('button', {
    name: translations[language][label].trim(),
  });
});
