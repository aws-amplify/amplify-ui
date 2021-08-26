Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  when signing into your application.

  Scenario Outline: Sign In with <status>
    Given I'm at the url "/ui/components/authenticator/sign-in-with-email"
    When I type my "email" with status <status>
    And I type my password
    And I click the "Sign In" button
    Then I see <result>

    Scenarios:
      | status                  | result                |
      | "UNKNOWN"               | "User does not exist" |
      | "UNCONFIRMED"           | "Confirmation Code"   |
      | "CONFIRMED"             | "Sign out"            |
      | "FORCE_CHANGE_PASSWORD" | "Change Password"     |
