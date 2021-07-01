import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const now = Date.now();

Given("I'm running the example {string}", url => {
  cy.visit(url);
});

And("I click {string}", text => {
  cy.findByText(text).click();
});

When("I type a new username", () => {
  cy.findByLabelText("Username").type(`test-${now}`);
});

And("I type the password {string}", password => {
  cy.findByLabelText("Password").type(password);
});

And("I type the email {string}", email => {
  cy.findByLabelText("Email address").type(email);
});

And("I type the phone number {string}", phone => {
  cy.findByLabelText("Phone number").type(phone);
});

And("I click the {string} button", (name: string) => {
  cy.findByRole("button", { name }).click();
});

Then("I see {string}", (message: string) => {
  cy.get("body").contains(message);
});
