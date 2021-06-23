Feature: Sign In

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Scenario: Sign in with invalid credentials
    Given I'm at the sign in page
    When I type an invalid username "INVALID_USERNAME"
    And I type an invalid password "INVALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"

  Scenario: Sign in with valid credentials
    Given I'm at the sign in page
    When I type a valid username "VALID_USERNAME"
    And I type a valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Hello VALID_USERNAME"
