import { When } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I drag and drop a file into the storage browser with file name {string}',
  (fileName: string) => {
    cy.get('[data-testid="dropzone"').trigger('drop', {
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
  }
);
