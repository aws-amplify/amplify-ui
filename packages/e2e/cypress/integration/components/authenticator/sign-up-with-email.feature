Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm using the example "components/authenticator/sign-up/with-email"
    And I click "Create account"

  Scenario: Username is not a requested field
    Then I don't see "Username" as an input field

  Scenario: Sign up form lists email first followed by phone number
    Then I see input fields in the order "Email" and "Phone Number"

  Scenario: Sign up with valid email & password
    When I type the email "VALID_EMAIL"
    And I type the password "VALID_PASSWORD"
    And I type the phone number "VALID_PHONE_NUMBER"
    And I click the "Create Account" button
    Then I see "Confirmation Code"
