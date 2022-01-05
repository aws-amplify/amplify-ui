import { And, Then } from 'cypress-cucumber-preprocessor/steps';

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

const getBreakpointsExample = () =>
  cy.findByTestId('responsive-object-syntax-breakpoints').scrollIntoView();

And(
  'renders {string} breakpoint with appropriate background color {string}',
  (breakpoint, color) => {
    cy.viewport(breakpoints[breakpoint], defaultHeight);
    getBreakpointsExample().should('have.css', 'background-color', color);
  }
);
And(
  'renders background color {string} at 1px less than {string}',
  (color, breakpoint) => {
    cy.viewport(breakpoints[breakpoint] - 1, defaultHeight);
    getBreakpointsExample().should('have.css', 'background-color', color);
  }
);
