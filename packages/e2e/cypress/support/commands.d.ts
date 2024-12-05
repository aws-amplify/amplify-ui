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

      /**
       * Clicks a button with the specified text. This command performs a case-insensitive match
       * and supports partial or full text matching using regular expressions.
       *
       * @example
       * cy.clickButtonWithText('Submit');
       * cy.clickButtonWithText('Cancel');
       *
       * @param name - The text of the button to click.
       */
      clickButtonWithText(name: string): void;

      /**
       * Checks if the document contains the specified text. This command performs a case-insensitive search
       * and ensures the text exists within the document's content.
       *
       * @example
       * cy.doesDocumentContainText('Welcome to the application');
       * cy.doesDocumentContainText('Error: File not found');
       *
       * @param text - The text to search for in the document.
       */
      doesDocumentContainText(text: string): void;

      /**
       * Types a value into an input field identified by its label. The label is matched case-insensitively,
       * allowing for flexible text matching.
       *
       * @example
       * cy.typeInInputHandler('Username', 'testuser');
       * cy.typeInInputHandler('Password', 'mypassword123');
       *
       * @param field - The label of the input field to type into.
       * @param value - The value to type into the input field.
       */
      typeInInputHandler(field: string, value: string): void;

      /**
       * Uploads one or more files to a file input field. Files are named using the provided base name
       * with an appended index (e.g., "example-1.txt"). The contents of the files are dynamically generated.
       *
       * @example
       * cy.fileInputUpload('example', 2); // Uploads "example-1.txt" and "example-2.txt"
       * cy.fileInputUpload('document');  // Uploads "document-1.txt"
       *
       * @param fileName - The base name for the files to upload.
       * @param fileCount - The number of files to upload. Defaults to 1.
       */
      fileInputUpload(fileName: string, fileCount?: number): void;
    }
  }
}

export {};
