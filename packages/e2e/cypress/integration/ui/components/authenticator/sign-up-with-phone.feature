Feature: Sign Up with Phone 

  Create a new user in the Amazon Cognito UserPool by passing the new user’s phone number and password.

  Background:
    Given I'm using the example "ui/components/authenticator/sign-up-with-phone/"
    And I click "Create account"

@React
  Scenario: Phone Number is the only requested alias
    Then I see "Phone Number" as an input field
    And I don't see "Username" as an input field
    And I don't see "Email" as an input field

@React @skip
  Scenario: Sign up with valid phone number & password
    When I type the phone number "VALID_PHONE_NUMBER"
    And I type the password "VALID_PASSWORD"
    And I confirm the password "VALID_PASSWORD"
    And I click the "Create Account" button
    Then I see "Confirmation Code"
