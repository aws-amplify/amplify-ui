Feature: Sign In with Phone Number

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their phone
  number when signing into your application.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-with-phone"

  @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I select my country code with status "UNKNOWN"
    And I type my "phone number" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  @angular @react @vue
  Scenario: Sign in with unconfirmed credentials
    When I select my country code with status "UNCONFIRMED"
    And I type my "phone number" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Confirmation Code"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials
    When I select my country code with status "CONFIRMED"
    And I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  @angular @react @vue
  Scenario: Sign in with confirmed credentials then sign out
    When I select my country code with status "CONFIRMED"
    And I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And I click the "Sign out" button
    Then I see "Sign in to your account"


  # FORCE_CHANGE_PASSWORD tests are skipped as the temporary passwords used for these
  # test accounts will expire in Cognito.
  @angular @react @vue @skip
  Scenario: Sign in with force change password credentials
    When I select my country code with status "FORCE_CHANGE_PASSWORD"
    And I type my "phone number" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"

  @angular @react @vue
  Scenario: Phone number field autocompletes username
  
  On sign in form, autocomplete prefers usage of username instead of phone number. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    Then "Phone Number" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "new-password"
    Then "Password" field autocompletes "current-password"
