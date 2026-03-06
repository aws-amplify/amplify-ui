Feature: Confirm Sign Up

  If you enabled multi-factor auth, confirm the sign-up after retrieving a confirmation code from the user.

  See: https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#confirm-sign-up

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"

  @angular @react @vue @svelte
  Scenario: Confirm new password page has correct translations and replaced placeholder
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "Confirmation Code"
    Then I see placeholder "Enter the code given"
    Then I see "Enter this code:"
    Then I see "It will take several minutes to arrive."

  @react-native
  Scenario: Confirm new password page has correct translations
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "Confirmation Code"

  @angular @react @vue @svelte @react-native
  Scenario: Confirm a new username & password with an invalid code
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "Confirmation Code"
    Then I type an invalid confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with error fixture "AWSCognitoIdentityProviderService.ConfirmSignUp-invalid-code"
    Then I click the "Confirm" button
    Then I see "Invalid verification code provided, please try again."

  @angular @react @vue @svelte @react-native
  Scenario: Confirm a new username & password with a valid code
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "We Emailed You"
    Then I see "Confirmation Code"
    Then I type a valid confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    Then I spy request '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'
    Then I click the "Confirm" button
    Then I don't see "Confirmation Code"
    Then I confirm request '{"headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }'

  @angular @react @vue @svelte
  Scenario: Confirmation Code field has type "one-time-code"

    See: https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element

    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then "Confirmation Code" field autocompletes "one-time-code"
