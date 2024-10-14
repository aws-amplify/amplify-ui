import { When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

When('I click the "Create Folder" button while offline', () => {
  cy.intercept('', (req) => {
    req.destroy();
  });

  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp('Create Folder')}$`, 'i'),
  }).click();
});
