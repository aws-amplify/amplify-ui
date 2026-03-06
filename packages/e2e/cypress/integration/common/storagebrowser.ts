import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { randomFileName } from './shared';

const FILE_VALIDATION_SIZE_LIMIT = 1000 * 1000; // 1MB

When(
  'I select {string} from the {string} dropdown',
  (value: string, label: string) => {
    cy.findByText(label).parent().find('select').select(value);

    // Wait for component remount and state updates to complete
    cy.wait(2000);
  }
);

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

Then(
  'I click the download button with label {string} and see the file downloaded',
  (label: string) => {
    cy.intercept('HEAD', 'https://*.s3.*.amazonaws.com/**').as(
      'downloadValidation'
    );

    cy.findAllByLabelText(label).last().click();

    cy.wait('@downloadValidation').then((interception) => {
      assert.equal(interception.response.statusCode, 200);
    });
  }
);

Then('I click checkbox for file {string}', selectTableRowCheckBox);

Then('I click checkbox for file with random name', () => {
  selectTableRowCheckBox(randomFileName);
});

Then('I click checkbox for button containing random name', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(randomFileName, 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });
});

Then('I see the File preview Loader', () => {
  cy.get('.amplify-storage-browser__preview-placeholder').should('exist');
});

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

Then('I see button containing random name', () => {
  cy.findByRole('button', {
    name: new RegExp(randomFileName, 'i'),
  }).should('exist');
});

Then('I see {string} folder deleted', (count: string) => {
  cy.contains(`${count} folder deleted`).should('exist');
});

Then('I see {string} folders deleted', (count: string) => {
  cy.contains(`${count} folders deleted`).should('exist');
});

Then('I see modal with title {string}', (title: string) => {
  cy.get('.amplify-modal__title').should('contain.text', title);
});

When('I click the modal {string} button', (buttonText: string) => {
  cy.get('.amplify-modal__footer').contains('button', buttonText).click();
});

Then('I see modal message {string}', (message: string) => {
  cy.get('.amplify-modal__body').should('contain.text', message);
});

Then('I see modal content {string}', (content: string) => {
  cy.get('.amplify-modal__body').should('contain.text', content);
});

Then('I see folder button containing random name', () => {
  cy.findByRole('button', {
    name: new RegExp(`${randomFileName}/`, 'i'),
  }).should('exist');
});

Then('I see file button containing random name', () => {
  cy.findByRole('button', {
    name: new RegExp(`${randomFileName}-1`, 'i'),
  }).should('exist');
});

Then('I click checkbox for folder containing random name', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(`${randomFileName}/$`, 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });
});

Then('I click checkbox for file containing random name', () => {
  cy.get('table tbody tr')
    .contains('button', new RegExp(`${randomFileName}-1$`, 'i'))
    .closest('tr')
    .within(() => {
      cy.get('label').click({ force: true });
    });
});

Then(
  'I click checkbox for button containing {string}',
  (buttonText: string) => {
    cy.get('table tbody tr')
      .contains('button', new RegExp(buttonText, 'i'))
      .closest('tr')
      .within(() => {
        cy.get('label').click({ force: true });
      });
  }
);
