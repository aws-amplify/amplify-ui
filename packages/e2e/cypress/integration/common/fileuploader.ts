import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I select a file with file name {string}', (fileName: string) => {
  cy.get('input[type=file]').selectFile(
    {
      contents: Cypress.Buffer.from('file contents'),
      fileName,
      lastModified: Date.now(),
    },
    /**
     *  Since the input is hidden, this will need to be forced through Cypress
     */
    { force: true }
  );
});

When(
  'I select a file with file name {string} and another file with file name {string}',
  (fileName: string, fileName2: string) => {
    cy.get('input[type=file]').selectFile(
      [
        {
          contents: Cypress.Buffer.from('file contents'),
          fileName,
          lastModified: Date.now(),
        },
        {
          contents: Cypress.Buffer.from('file contents'),
          fileName: fileName2,
          lastModified: Date.now(),
        },
      ],
      /**
       *  Since the input is hidden, this will need to be forced through Cypress
       */
      { force: true }
    );
  }
);

When('I drag and drop a file with file name {string}', (fileName: string) => {
  cy.get('input[type=file]').selectFile(
    {
      contents: Cypress.Buffer.from('file contents'),
      fileName,
      lastModified: Date.now(),
    },
    /**
     *  Since the input is hidden, this will need to be forced through Cypress
     */
    { force: true, action: 'drag-drop' }
  );
});
