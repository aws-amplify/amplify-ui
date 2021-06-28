Feature: Sign Up

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address, password, and other attributes.

  Background:
    Given I'm using the example "components/authenticator"
    And I click "Create account"

  Scenario: Sign up with valid email & password
    When I type the email "VALID_EMAIL"
    And I type the password "VALID_PASSWORD"
    And I type the phone number "VALID_PHONE"
    And I click the "Create Account" button
    Then I see "Confirmation Code"