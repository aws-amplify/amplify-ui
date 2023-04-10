/// <reference types="@testing-library/cypress" />
/// <reference types="cypress" />
/// <reference types="../../support/commands" />

import { When } from 'cypress-cucumber-preprocessor/steps';

When(
  'I request {string} and get {string}',
  (url: string, statusCode: string) => {
    cy.request({ url, followRedirect: true }).then(({ status }) => {
      expect(status).to.be.equal(+statusCode);
    });
  }
);
