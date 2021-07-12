import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm running the example {string}", (url: string) => {
  cy.visit(url);
  cy.get("[data-amplify-heading]").should("be.visible");
});

When("I type a valid email {string}", (email: string) => {
  cy.get("[data-amplify-usernamealias]").type(Cypress.env(email));
});

When("I type an invalid email {string}", (email: string) => {
  cy.get("[data-amplify-usernamealias]").type(Cypress.env(email));
});

And("I type an invalid password {string}", (password: string) => {
  cy.get("[data-amplify-password]").type(Cypress.env(password));
});

And("I type a valid password {string}", (password: string) => {
  cy.get("[data-amplify-password]").type(Cypress.env(password));
});

And("I click the {string} button", (name: string) => {
  cy.findByRole("button", { name }).click();
});

Then("I will be redirected to the confirm totp mfa page", () => {
  cy.get("body").contains("TOTP");
});

Then("I will be redirected to the setup mfa page", () => {
  cy.get("[data-amplify-qrcode]").should("be.visible");
});

// TODO - this test is failing in the new Authenticator until we add in the error handling in the component
Then("I see {string}", (message: string) => {
  const [messageString, username] = message.split(" ");
  cy.get("body").contains([messageString, Cypress.env(username)].join(" "));
});
