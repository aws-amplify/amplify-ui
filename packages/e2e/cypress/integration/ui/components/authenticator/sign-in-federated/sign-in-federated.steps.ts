import { And, Given } from 'cypress-cucumber-preprocessor/steps';

/**
 * This test file is super sparse, but I cannot get it to do anything
 * once I click on the "Sign in" button without failing. Intercepting
 * any calls doesn't work either. Or, rather, I can intercept the calls,
 * but it doesn't prevent the test from failing due to Cypress timing
 * out on a page redirect.
 *
 * Going to leave this sparse for now and see if I can get our new
 * implementation to work a little bit nicer. Will include a GIF of
 * manual verification that the feature works in the PR.
 */

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
  cy.get('[data-amplify-authenticator-signin]').should('be.visible');
});

And('I see the {string} sign in button', (provider: string) => {
  cy.findByRole('button', { name: `Sign in with ${provider}` }).should(
    'be.visible'
  );
});
