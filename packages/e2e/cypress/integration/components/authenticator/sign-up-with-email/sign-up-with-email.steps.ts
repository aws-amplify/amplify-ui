import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I'm using the example {string}", (example: string) => {
  cy.visit(example);
});

And("I click {string}", (text: string) => {
  cy.findByText(text).click();
});

Then("I don't see {string} as an input field", (name: string) => {
  cy.findAllByRole("textbox").each($el =>
    cy
      .wrap($el)
      .invoke("attr", "placeholder")
      .should("not.contain", name)
  );
});

Then(
  "I see input fields in the order {string} and {string}",
  (...fields: string[]) => {
    cy.findAllByRole("textbox").each(($el, i) =>
      cy.wrap($el).should("have.attr", "placeholder", fields[i])
    );
  }
);

When("I type the email {string}", (email: string) => {
  cy.findByPlaceholderText(/email/i).type(Date.now() + Cypress.env(email));
});

And("I type the password {string}", (password: string) => {
  cy.findByPlaceholderText(/password/i).type(Cypress.env(password));
});

And("I type the phone number {string}", (phoneNumber: string) => {
  cy.findByPlaceholderText(/phone\snumber/i).type(Cypress.env(phoneNumber));
});

And("I click the {string} button", (name: string) => {
  cy.findByRole("button", { name }).click();
});

Then("I see {string}", (message: string) => {
  cy.findByRole("document").contains(message);
});
