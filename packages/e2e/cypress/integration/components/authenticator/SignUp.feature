Feature: Sign Up

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address, password, and other attributes.

  Scenario: Sign up with valid username & password
    Given I’m using the example "components/authenticator"
    When I type the username "VALID_USERNAME"
    And I type the password "VALID_PASSWORD"
    And I click the "Sign UP" button
    Then I see "Confirmation code"
