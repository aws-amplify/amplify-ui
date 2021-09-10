Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"

  @angular @next @vue
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  @angular @next @vue
  Scenario: Sign in with unconfirmed credentials
    When I type my "email" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Confirmation Code"

  @angular @next @vue
  Scenario: Sign in with confirmed credentials
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  Scenario: Sign in with force change password credentials
    When I type my "email" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"
