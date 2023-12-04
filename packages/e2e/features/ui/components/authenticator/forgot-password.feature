Feature: Reset Password

  End users can reset their password through "Forgot your password?" link.

  Background:
    Given I'm running the example "ui/components/authenticator/forgot-password"

  @react @vue @angular @react-native
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
