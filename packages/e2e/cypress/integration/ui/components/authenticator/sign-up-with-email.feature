Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm using the example "ui/components/authenticator/sign-up-with-email"
    And I click "Create account"


@Next @React @Vue
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

@Next @React @Vue
  Scenario: Sign up with valid email & password
    When I type the email "VALID_EMAIL"
    And I type the password "VALID_PASSWORD"
    And I confirm the password "VALID_PASSWORD"
    And I click the "Create Account" button
    Then I see "Confirmation Code"
