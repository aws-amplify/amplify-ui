// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select input element by role or placeholder text
       *
       * @param {string} field - name of the input field, or alternatively
       *   placeholder value for password inputs.
       * @example cy.findInputField('Password')
       */
      findInputField(field: string): Chainable<JQuery<HTMLInputElement>>;

      /**
       * Custom command to build an authentication alias based on the 'loginMechanism' and 'status' which will then be
       * typed into a previously selected input element.
       *
       * @example cy.findByRole('textbox').typeAliasWithStatus('email', 'CONFIRMED') -> cy.findByRole('textbox').type('sample_email+CONFIMRED@example.com')
       */
      typeAliasWithStatus(
        loginMechanism: string,
        status: string
      ): Chainable<Element>;

      /**
       * Waits for the map's idle event to be fired. Useful for waiting for map animations to complete before executing
       * additional Cypress commands.
       *
       * @example cy.waitForIdleMap();
       * cy.get('.maplibregl-marker').first().click();
       */
      waitForIdleMap(): void;
    }
  }
}

export {};
