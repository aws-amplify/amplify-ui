import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

// the current value returned by the service is 15000,
// the below value can be increased as needed
const LIVENESS_TIMEOUT = 60000;

Then('I see the {string} timeout error', (message: string) => {
  cy.findByRole('document')
    .contains(new RegExp(escapeRegExp(message), 'i'), {
      timeout: LIVENESS_TIMEOUT,
    })
    .should('exist');
});
