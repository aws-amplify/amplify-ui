import { When } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I drag and drop a file into the storage browser with file name {string}',
  (fileName: string) => {
    cy.get('[data-testid="storage-browser-table"').trigger('drop', {
      dataTransfer: {
        files: [
          new File(['file contents'], fileName, {
            type: 'text/plain',
            lastModified: Date.now(),
          }),
        ],
      },
    });
  }
);

When(
  'I drag and drop a folder into the storage browser with name {string}',
  (folderName: string) => {
    cy.get('[data-testid="storage-browser-table"').trigger('drop', {
      dataTransfer: {
        files: [new File([], folderName, { lastModified: Date.now() })],
      },
    });
  }
);
