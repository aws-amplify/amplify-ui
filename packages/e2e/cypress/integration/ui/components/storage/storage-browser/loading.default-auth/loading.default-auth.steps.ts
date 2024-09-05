import { Before, Given } from '@badeball/cypress-cucumber-preprocessor';

let language = 'en-US';

Before(() => {
  cy.intercept({ method: 'GET', query: { 'list-type': '2' } }, (req) => {
    req.on('response', (res) => {
      res.setDelay(2000);
    });
  });
});

Given(
  "I'm running the StorageBrowser example {string} on a slow connection",
  (example: string) => {
    cy.visit(example, {
      // See: https://glebbahmutov.com/blog/cypress-tips-and-tricks/#control-navigatorlanguage
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: language });
      },
      onLoad(contentWindow) {
        window = contentWindow;
      },
    });
  }
);
