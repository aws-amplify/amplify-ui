import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
  cy.get("[data-test=sign-in-header-section]").should("be.visible");
});

When("I type a valid phone number {string}", (phoneNumber: string) => {
  cy.get("[data-test=username-input]").type(Cypress.env(phoneNumber));
});

When("I type an invalid username {string}", (phoneNumber: string) => {
  cy.get("[data-test=username-input]").type(Cypress.env(phoneNumber));
});

And("I type an invalid password {string}", (password: string) => {
  cy.get("[data-test=sign-in-password-input]").type(Cypress.env(password));
});

And("I type a valid password {string}", (password: string) => {
  cy.get("[data-test=sign-in-password-input]").type(Cypress.env(password));
});

And("I click the {string} button", (name: string) => {
  cy.findByRole("button", { name }).click();
});

Then("I will be redirected to the confirm sms mfa page", () => {
  cy.get("[data-test=confirm-sign-in-header-section]").should("be.visible");
});

Then("I see {string}", (message: string) => {
  const [messageString, username] = message.split(" ");
  cy.get("body").contains([messageString, Cypress.env(username)].join(" "));
});
