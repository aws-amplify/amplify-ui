import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const now = Date.now();

Given("I'm running the example {string}", url => {
  cy.visit(url);
});

And("I click {string}", text => {
  cy.findByText(text).click();
});

When("I type a new username", () => {
  cy.get("input[name=username]").type(`test-${now}`);
});

And("I type the password {string}", password => {
  cy.get("input[name=password]").type(password);
});

And("I type the email {string}", email => {
  cy.get("input[name=email]").type(email);
});

And("I type the phone number {string}", phone => {
  cy.get("input[name=phone_line_number]").type(phone);
});

And("I click the {string} button", (name: string) => {
  cy.findByRole("button", { name }).click();
});

Then("I see {string}", (message: string) => {
  cy.get("body").contains(message);
});
