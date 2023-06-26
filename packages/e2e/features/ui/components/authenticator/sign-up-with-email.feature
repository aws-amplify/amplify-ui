Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"

  @angular @react @vue @react-native
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

  @angular @react @vue  
  Scenario: Sign up with a new email & password and check auth message
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    And I see "unauthenticated"
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I see "authenticated"
    Then I see "Confirmation Code"

@angular @react @vue  
  Scenario: Sign up with a new email & password and lowercase the email 
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I type a new "email" with value "TEST@example.com"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I verify the body has "test@example.com" included
    Then I see "Confirmation Code"

@react-native
  Scenario: Confirm sign up submit button is disabled when required fields are empty or invalid
    When I click the "Create Account" button
    Then I do not see a remote error with id "amplify__error-message"
    When I type a new "email" with value "TEST@example.com"
    And I type my password
    And I add an invalid password confirmation
    And I click the "Create Account" button
    Then I do not see a remote error with id "amplify__error-message"

@angular @react @vue @react-native
Scenario: Sign up with a new email & password
  Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
  When I type a new "email"
  And I type my password
  And I confirm my password
  And I click the "Create Account" button
  Then I see "Confirmation Code"

  @angular @react @vue
  Scenario: Email field autocompletes username

  On sign up form, autocomplete prefers usage of username instead of email. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/.

    And "Email" field autocompletes "username"

  @angular @react @vue
  Scenario: Password fields autocomplete "new-password"
    And "Password" field autocompletes "new-password"
    And "Confirm Password" field autocompletes "new-password"
    