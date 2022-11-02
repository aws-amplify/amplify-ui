import { Then, When } from '@badeball/cypress-cucumber-preprocessor';

When('I select a file with file name {string}', (fileName: string) => {
  cy.get('input[type=file]').selectFile(
    {
      contents: Cypress.Buffer.from('file contents'),
      fileName,
      lastModified: Date.now(),
    },
    { force: true }
  );
});
