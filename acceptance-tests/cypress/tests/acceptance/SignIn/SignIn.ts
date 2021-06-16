import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm at the sign in page", () => {
  cy.visit("/auth");
});

When("I type an invalid email address {string}", (email: string) => {
  cy.findByRole("textbox", { name: /username/i }).type(email);
});

And("I type an invalid password {string}", (password: string) => {
  cy.findByLabelText(/password/i).type(password);
});

And("I attempt to sign in", () => {
  cy.findByRole("button", { name: "Sign In" }).click();
});

Then("I see the error {string}", (errorMessage: string) => {
  cy.findByRole("alert", { name: /error/i }).should("contain", errorMessage);
});
