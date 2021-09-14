import { When } from 'cypress-cucumber-preprocessor/steps';

When('I select the country code {string}', (countryCode: string) => {
  cy.findByRole('combobox', { name: /country code/i }).select(countryCode);
});
