Feature: Sign Up

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address, password, and other attributes.

  Background:
    Given I'm running the example "components/authenticator/sign-up"
    And I click "Create account"

  @React
  Scenario: Sign up with a new username & password
    When I type a new username
    And I type the password "test-password"
    And I type the email "test@example.com"
    And I type the phone number "5558675309"
    And I click the "Create Account" button
    Then I see "Confirm Sign Up"
    And I see "Confirmation Code"
