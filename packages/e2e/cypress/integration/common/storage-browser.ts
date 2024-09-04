import { When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

When('I click the {string} button on a slow network', (name: string) => {
  cy.intercept({ method: 'GET' }, (req) => {
    alert('intercepted');
    req.on('response', (res) => {
      res.setDelay(5000);
    });
  });

  cy.findByRole('button', {
    name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
  }).click();
});
