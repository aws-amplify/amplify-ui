Feature: Sign In

  Ampilfy's SignIn component uses AWS Cognito's authentication service to provide a
  sign in experience to your application's users.

  Scenario Outline: Sign in with <status> username and password
    Given I'm at the sign in page
    When I type a username <username-key> that is <status>
    And I type a password <password-key> that is <status>
    And I click the "Sign In" button
    Then I see <message>

    Examples:
      |  status |       username-key |       password-key |                message |
      | invalid | "INVALID_USERNAME" | "INVALID_PASSWORD" | "User does not exist." |
      |   valid |   "VALID_USERNAME" |   "VALID_PASSWORD" | "Hello VALID_USERNAME" |