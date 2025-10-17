Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"

  @angular @react @vue @svelte @react-native
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    Then I don't see "Username" as an input field
    Then I don't see "Phone Number" as an input field

  @angular @react @vue @svelte
  Scenario: Sign up with a new email & password and check auth message
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    Then I see "unauthenticated"
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "authenticated"
    Then I see "Confirmation Code"

  @angular @react @vue @svelte
  Scenario: Sign up with a new email & password and lowercase the email
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I type a new "email" with value "TEST@example.com"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I verify the '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' body has "test@example.com" included
    Then I see "Confirmation Code"

  @react-native
  Scenario: Confirm sign up submit button is disabled when required fields are empty or invalid
    When I click the "Create Account" button
    Then I do not see a remote error with id "amplify__error-message"
    When I type a new "email" with value "TEST@example.com"
    Then I type my password
    Then I add an invalid password confirmation
    Then I click the "Create Account" button
    Then I do not see a remote error with id "amplify__error-message"

  @angular @react @vue @svelte @react-native
  Scenario: Sign up with a new email & password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "Confirmation Code"

  @react-native
  Scenario: Sign up using invalid email
    When I type a new "email" with value ''
    Then I see "This field is required"
    When I type a new "email" with value 'inv'
    Then I see "Please enter a valid email"

  @angular @react @vue @svelte
  Scenario: Email field autocompletes username

  On sign up form, autocomplete prefers usage of username instead of email.
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/.

    Then "Email" field autocompletes "username"

  @angular @react @vue @svelte
  Scenario: Password fields autocomplete "new-password"
    Then "Password" field autocompletes "new-password"
    Then "Confirm Password" field autocompletes "new-password"
