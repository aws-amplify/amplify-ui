import { When } from '@badeball/cypress-cucumber-preprocessor';

When('I select a file with file name {string}', (fileName: string) => {
  cy.fileInputUpload(fileName);
});

When(
  'I select a file with file name {string} and another file with file name {string}',
  (fileName: string, fileName2: string) => {
    cy.fileInputUpload(fileName);
    cy.fileInputUpload(fileName2);
  }
);

When('I drag and drop a file with file name {string}', (fileName: string) => {
  cy.get('input[type=file]').trigger('drop', {
    dataTransfer: {
      files: [
        new File(['file contents'], fileName, { lastModified: Date.now() }),
      ],
    },
    /**
     *  Since the input is hidden, this will need to be forced through Cypress
     */
    force: true,
  });
});
