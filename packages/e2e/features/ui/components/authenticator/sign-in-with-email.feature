Feature: Sign In with Email

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their email
  when signing into your application.

  Background:
    Given I'm running the example "/ui/components/authenticator/sign-in-with-email"

  @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  @angular @react @vue
  Scenario: Sign in with unconfirmed credentials
    When I type my "email" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Confirmation Code"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

@angular @react @vue
  Scenario: Sign in with confirmed credentials then sign out
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see "Sign in to your account"



  # FORCE_CHANGE_PASSWORD tests are skipped as the temporary passwords used for these
  # test accounts will expire in Cognito.
  Scenario: Sign in with force change password credentials
    When I type my "email" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"

  @angular @react @vue
  Scenario: Email field autocompletes username

  On sign in form, autocomplete prefers usage of username instead of email. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    And "Email" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "current-password"
    And "Password" field autocompletes "current-password"
