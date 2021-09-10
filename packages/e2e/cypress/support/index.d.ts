/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to select input element by role or placeholder text
     *
     * @param {string} field - name of the input field, or alternatively
     *   placeholder value for password inputs.
     * @example cy.getInputField('password')
     */
    getInputField(field: string): Chainable<Element>;
  }
}
