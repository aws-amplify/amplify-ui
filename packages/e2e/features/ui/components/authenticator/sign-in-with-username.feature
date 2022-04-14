Feature: Sign In with Username

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use a customized
  username when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-username"

  @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I type my "username" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  @angular @react @vue
  Scenario: Sign in with unconfirmed credentials
    When I type my "username" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Confirmation Code"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    When I reload the page
    Then I see "Sign out"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials, reload, sign out, then sign in again
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    When I reload the page
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see "Sign in"
    And I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials, sign out, then sign in again
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see "Sign in"
    And I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  # FORCE_CHANGE_PASSWORD tests are skipped as the temporary passwords used for these
  # test accounts will expire in Cognito.
  @angular @react @vue
  Scenario: Sign in with force change password credentials
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    When I type my "username" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"

  @angular @react @vue
  Scenario: Username field autocompletes username
    Then "Username" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "current-password"
    Then "Password" field autocompletes "current-password"
