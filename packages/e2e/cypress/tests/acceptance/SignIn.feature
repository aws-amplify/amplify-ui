Feature: Sign In

  Amplify's Authenticator is a wrapper for a developer's application.
  It provides an application with authentication features using AWS Cognito.
  Its features include sign in, sign up, and sign out.

  Scenario: Sign in with invalid credentials
    Given I'm at the sign in page
    When I type an invalid username "INVALID_USERNAME"
    And I type an invalid password "INVALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"

  Scenario: Sign in with valid credentials
    Given I'm at the sign in page
    When I type a valid username "VALID_USERNAME"
    When I type a valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Hello VALID_USERNAME"
