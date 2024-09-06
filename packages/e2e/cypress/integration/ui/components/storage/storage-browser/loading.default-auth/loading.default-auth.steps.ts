import { When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

When(
  'I click the button containing {string} on a slow connection',
  (name: string) => {
    cy.intercept({ method: 'GET', query: { 'list-type': '2' } }, (req) => {
      req.on('response', (res) => {
        res.setDelay(5000);
      });
    });

    cy.findByRole('button', {
      name: new RegExp(`${escapeRegExp(name)}`, 'i'),
    }).click();
  }
);
