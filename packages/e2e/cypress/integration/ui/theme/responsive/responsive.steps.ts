import { And, Then } from '@badeball/cypress-cucumber-preprocessor';

const breakpoints = {
  base: 0,
  small: 480,
  medium: 768,
  large: 992,
  xl: 1280,
  xxl: 1536,
};
const defaultHeight = 844;

Then('the page contains {string} section', (search: string) => {
  cy.findByRole('document').contains(search);
});

Then('the breakpoint is at {string}', (breakpoint: number) => {
  cy.viewport(breakpoints[breakpoint], defaultHeight);
});

Then('I downsize the {string} viewport by 1px', (breakpoint: number) => {
  cy.viewport(breakpoints[breakpoint] - 1, defaultHeight).wait(1000);
});

And('the breakpoints example is in view', () => {
  cy.findByTestId('responsive-object-syntax-breakpoints').scrollIntoView();
});

And('the background color should be {string}', (color: string) => {
  cy.findByTestId('responsive-object-syntax-breakpoints').should(
    'have.css',
    'background-color',
    color
  );
});
