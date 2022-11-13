Feature: Confirm Sign Up

  If you enabled multi-factor auth, confirm the sign-up after retrieving a confirmation code from the user.

  See: https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#confirm-sign-up

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"

  @angular @react @vue
  Scenario: Confirm  new password page has correct translations and replaced placeholder
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I see "Confirmation Code"
    And I see placeholder "Enter the code given"
    Then I see "Enter this code:"
    Then I see "It will take several minutes to arrive."

  @angular @react @vue
  Scenario: Confirm a new username & password with an invalid code
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I see "Confirmation Code"
    And I type an invalid confirmation code
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with error fixture "AWSCognitoIdentityProviderService.ConfirmSignUp-invalid-code"
    And I click the "Confirm" button
    # Not the actual error a real user would see because this is a test user with a mock API call
    Then I see "Username/client id combination not found."

  @angular @react @vue
  Scenario: Confirm a new username & password with a valid code
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    And I see "Confirmation Code"
    And I type a valid confirmation code
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    And I click the "Confirm" button
    And I mock "autoSignIn" event with fixture "Auth.currentAuthenticatedUser-verified-email"
    Then I see "Sign out"
  
  @angular @react @vue 
  Scenario: User is already confirmed and then clicks Resend Code
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Confirmation Code"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ResendConfirmationCode" } }' with error fixture "user-already-confirmed-error"
    # Mocking these two calls is much easier than intercepting 6+ network calls with tokens that are validated & expire within the hour
    And I mock 'Amplify.Auth.signIn' with fixture "Auth.signIn-verified-email"
    And I mock 'Amplify.Auth.currentAuthenticatedUser' with fixture "Auth.currentAuthenticatedUser-verified-email"
    And I click the "Resend Code" button
    And I mock "autoSignIn" event with fixture "Auth.signIn-verified-email"
    Then I see "Sign out"

  @angular @react @vue
  Scenario: Supports "One-Time Code"

    See: https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element

    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then "Confirmation Code" field autocompletes "one-time-code"
