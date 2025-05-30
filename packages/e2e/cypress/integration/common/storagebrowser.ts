import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { randomFileName } from './shared';

const FILE_VALIDATION_SIZE_LIMIT = 1000 * 1000; // 1MB

const selectTableRowCheckBox = (name: string) => {
  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .first()
    .within(() => {
      cy.get('label').click({ force: true });
    });
};

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

Then('I see download for file {string}', (name: string) => {
  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .last()
    .children('button');
});

Then('I see no download for folder {string}', (name: string) => {
  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .last()
    .children('div');
});

Then('I click and see download succeed for {string}', (name: string) => {
  cy.intercept('HEAD', 'https://*.s3.*.amazonaws.com/**').as(
    'downloadValidation'
  );

  cy.contains('table tbody td:nth-child(2)', new RegExp('^' + name + '$'))
    .siblings()
    .last()
    .within(() => {
      cy.get('button').click({ force: true });

      cy.wait('@downloadValidation').then((interception) => {
        assert.equal(interception.response.statusCode, 200);
      });
    });
});

Then('I click checkbox for file {string}', selectTableRowCheckBox);

Then(
  'I click checkbox for with {string} files with random names',
  (count: string) => {
    const fileCount = parseInt(count);
    for (let i = 1; i <= fileCount; i++) {
      selectTableRowCheckBox(`${randomFileName}-${i}`);
    }
  }
);

When(
  'I upload {string} valid files of size 1MB and type jpeg with random names',
  (count: string) => {
    cy.fileInputUpload(
      randomFileName,
      parseInt(count),
      FILE_VALIDATION_SIZE_LIMIT,
      'image/jpeg'
    );
  }
);

When(
  'I upload {string} invalid files with size greater than 1MB with random names',
  (count: string) => {
    cy.fileInputUpload(
      randomFileName,
      parseInt(count),
      FILE_VALIDATION_SIZE_LIMIT + 1
    );
  }
);
