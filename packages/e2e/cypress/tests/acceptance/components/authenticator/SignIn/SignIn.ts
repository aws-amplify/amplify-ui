import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm at the sign in page", () => {
  cy.visit("/components/authenticator/examples/sign-in");
});

When("I type an invalid username {string}", (username: string) => {
  // cy.findByRole("textbox", { name: /username/i }).type(email);
  cy.get("[data-test=username-input]").type(username);
});

And("I type an invalid password {string}", (password: string) => {
  cy.get("[data-test=sign-in-password-input]").type(password);
});

And("I click the {string} button", name => {
  cy.findByRole("button", { name }).click();
});

Then("I see the error {string}", (errorMessage: string) => {
  cy.findByRole("alert", { name: /error/i }).should("contain", errorMessage);
});

When("I type a valid username {string}", (username: string) => {
  cy.get("[data-test=username-input]").type(username);
});

And("I type a valid password {string}", (password: string) => {
  cy.get("[data-test=sign-in-password-input]").type(password);
});

Then("I see {string}", (message: string) => {
  cy.get("body").contains(message);
});
