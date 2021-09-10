Feature: Sign In with Phone Number

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Amplify can be configured to allow a user to use their phone
  number when signing into your application.

  Background:
    Given I'm at the sign in page

  @vue @react @angular
  Scenario: Sign in with unknown credentials
    When I type the valid phone number "UNKNOWN_PHONE_NUMBER"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"

  @vue @react @angular
  Scenario: Sign in with unconfirmed credentials
    When I type the valid phone number "UNCONFIRMED_PHONE_NUMBER"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Confirmation Code"

  @vue @react @angular
  Scenario: Sign in with confirmed credentials
    When I type the valid phone number "CONFIRMED_PHONE_NUMBER"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Sign out"

  @react @skip
  Scenario: Sign in with force change password credentials
    When I type the valid phone number "FORCE_CHANGE_PHONE_NUMBER"
    And I type the valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "Change Password"

  @next @react @vue @angular
  Scenario: Phone number field autocompletes phone number
  
  On sign in form, autocomplete prefers usage of username instead of phone number. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    And "Phone Number" field autocompletes "username"

  @next @react @vue @angular
  Scenario: Password fields autocomplete "new-password"
    And "Password" field autocompletes "current-password"
