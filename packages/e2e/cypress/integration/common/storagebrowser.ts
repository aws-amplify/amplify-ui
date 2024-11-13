import { When } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I drag and drop a file into the storage browser with file name {string}',
  (fileName: string) => {
    cy.get('.amplify-storage-browser__drop-zone').trigger('drop', {
      dataTransfer: {
        files: [
          new File(['file contents'], fileName, {
            type: 'text/plain',
            lastModified: Date.now(),
          }),
        ],
      },
      /**
       *  Since the input is hidden, this will need to be forced through Cypress
       */
      force: true,
    });
  }
);

When(
  'I drag and drop a folder into the storage browser with name {string}',
  (folderName: string) => {
    cy.get('.amplify-storage-browser__drop-zone').trigger('drop', {
      dataTransfer: {
        files: [new File([], folderName, { lastModified: Date.now() })],
      },
      /**
       *  Since the input is hidden, this will need to be forced through Cypress
       */
      force: true,
    });
  }
);
