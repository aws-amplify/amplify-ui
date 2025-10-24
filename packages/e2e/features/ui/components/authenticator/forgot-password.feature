Feature: Reset Password

  End users can reset their password through "Forgot your password?" link.

  Background:
    Given I'm running the example "ui/components/authenticator/forgot-password"

  @react @vue @svelte @angular @react-native
  Scenario: Forgot Password with valid username
    When I type my "username" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    Then I see "Code *"
    Then I type a valid code
    Then I type my new password
    Then I confirm my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' with fixture "confirm-reset-password"
    Then I click the 'Submit' button
    Then I see "Sign In"

  @react @vue @svelte @angular @react-native
  Scenario: Forgot Password with invalid username
    When I type my "username" with status "UNKNOWN"
    Then I click the "Send code" button
    Then I see "Username/client id combination not found."

  @angular @react @vue @svelte @react-native
  Scenario: Forgot Password with valid placeholder
    Then I see "Enter your username"
    Then I don't see "Enter your phone number"
    Then I don't see "Enter your email"

  @angular @react @vue @svelte @react-native
  Scenario: Forgot Password with wrong password requirements
    When I type my "username" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    Then I see "Code *"
    Then I type a valid code
    Then I type an invalid wrong complexity new password
    Then I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have upper case letters"
    Then I see "Password must have at least 8 characters"

  @react-native
  Scenario: Forgot Password with wrong password requirements typed slowly
    When I type my "username" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    Then I see "Code *"
    Then I type a valid code
    Then I slowly type an invalid wrong complexity new password
    Then I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have upper case letters"
    Then I see "Password must have at least 8 characters"

  @angular @react @vue @svelte @react-native
  Scenario: Forgot Password without lower case characters
    When I type my "username" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    Then I see "Code *"
    Then I type a valid code
    Then I type an invalid no lower case new password
    Then I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have lower case letters"
    Then I see "Password must have at least 8 characters"
    Then I confirm "Password must have numbers" error is accessible in new password field

  @react @vue @svelte @angular @react-native
  Scenario: Forgot Password with resend code
    When I type my "username" with status "CONFIRMED"
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    Then I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    Then I click the "Resend Code" button
    Then I see "Code *"
    Then I type a valid code
    Then I type my new password
    Then I confirm my password
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' with fixture "confirm-reset-password"
    Then I click the 'Submit' button
    Then I see "Sign In"
