import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm at the sign in page", () => {
  cy.visit("/");
});

When("I type an invalid email address {word}", (email: string) => {
  cy.findAllByLabelText(/Username/)
    .first()
    .type(email);
});

And("I type an invalid password {word}", (password: string) => {
  cy.findAllByLabelText(/Password/)
    .first()
    .type(password);
});

Then("I see the error {string}", (errorMessage: string) => {});

And("I don't see the application", () => {});
