Feature: Authentication

  Amplify's Authenticator is a wrapper for a developer's application.
  It provides an application with authentication features using AWS Cognito.
  Its features include sign in, sign up, and sign out.

  Scenario: Sign in with invalid credentials
    Given I'm at the sign in page
    When I type an invalid email address "fake@email.com"
    And I type an invalid password "fakepassword"
    And I attempt to sign in
    Then I see the error "User does not exist."