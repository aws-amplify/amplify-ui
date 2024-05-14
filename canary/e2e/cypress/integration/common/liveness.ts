import { When } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I request {string} and get {string}',
  (url: string, statusCode: string) => {
    cy.request({ url, followRedirect: true }).then(({ status }) => {
      expect(status).to.be.equal(+statusCode);
    });
  }
);
