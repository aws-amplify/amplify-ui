/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to select input element by role or placeholder text
     * @example cy.dataCy('greeting')
     */
    getInputField(
      fieldName: string,
      options?: { password: boolean }
    ): Chainable<Element>;
  }
}
