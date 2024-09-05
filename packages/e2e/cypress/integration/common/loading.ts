import { Before, Given, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

let language = 'en-US';

Given(
  "I'm running the StorageBrowser example {string} on a slow connection",
  (example: string) => {
    beforeEach(() => {
      cy.intercept({ method: '' }, (req) => {
        console.log('intercepted');
        req.on('response', (res) => {
          res.setDelay(3000);
        });
      });
    });

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

// When('I click the {string} button on a slow network', (name: string) => {
//   cy.findByRole('button', {
//     name: new RegExp(`^${escapeRegExp(name)}$`, 'i'),
//   }).click();
// });
