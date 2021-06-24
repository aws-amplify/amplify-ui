import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm at the sign in page", () => {
  cy.visit("/components/authenticator/examples/sign-in");
});

When("I type an invalid username {string}", (username: string) => {
  cy.get("[data-test=username-input]").type(Cypress.env(username));
});

And("I type an invalid password {string}", (password: string) => {
  cy.get("[data-test=sign-in-password-input]").type(Cypress.env(password));
});

And("I click the {string} button", (name: string) => {
  cy.findByRole("button", { name }).click();
});

When("I type a valid username {string}", (username: string) => {
  cy.get("[data-test=username-input]").type(Cypress.env(username));
});

And("I type a valid password {string}", (password: string) => {
  cy.get("[data-test=sign-in-password-input]").type(Cypress.env(password));
});

Then("I see {string}", (message: string) => {
  const [messageString, username] = message.split(" ");
  cy.get("body").contains([messageString, Cypress.env(username)].join(" "));
});
