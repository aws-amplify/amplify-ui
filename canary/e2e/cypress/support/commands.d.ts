// describe custom Cypress commands in this file

// load the global Cypress types
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to select input element by role or placeholder text
     *
     * @param {string} field - name of the input field, or alternatively
     *   placeholder value for password inputs.
     * @example cy.findInputField('Password')
     */
    findInputField(field: string): Chainable<JQuery<HTMLInputElement>>;
  }
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to build an authentication alias based on
     * the 'loginMechanism' and 'status' which will then be typed
     * into a previously selected input element.
     * @example cy.findByRole('textbox').typeAliasWithStatus('email', 'CONFIRMED') -> cy.findByRole('textbox').type('sample_email+CONFIMRED@example.com')
     */
    typeAliasWithStatus(
      loginMechanism: string,
      status: string
    ): Chainable<Element>;
  }
}
