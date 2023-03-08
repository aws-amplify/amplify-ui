Feature: Reset Password

  End users can reset their password through "Forgot your password?" link.

  Background:
    Given I'm running the example "ui/components/authenticator/reset-password"

  @react @vue @angular
  Scenario: Reset Password with valid username
    When I type my "username" with status "CONFIRMED"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    And I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    And I see "Code"
    Then I type a valid code
    And I type my new password
    And I confirm my password
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' with fixture "confirm-reset-password"
    And I click the submit button
    Then I see "Sign In"
    
  @react @vue @angular
  Scenario: Reset Password with invalid username
    When I type my "username" with status "UNKNOWN"
    And I click the "Send code" button
    Then I see "Username/client id combination not found."

  @angular @react @vue
  Scenario: Reset Password with valid placeholder 
    Then I see "Enter your username"
    And I don't see "Enter your phone number"
    And I don't see "Enter your email"

  @angular @react @vue
  Scenario: Reset Password with wrong password requirements
    When I type my "username" with status "CONFIRMED"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    And I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    And I see "Code"
    Then I type a valid code
    And I type an invalid wrong complexity new password
    And I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have upper case letters"
    Then I see "Password must have at least 8 characters"

  @angular @react @vue
  Scenario: Reset Password without lower case characters
    When I type my "username" with status "CONFIRMED"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    And I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    And I see "Code"
    Then I type a valid code
    And I type an invalid no lower case new password
    And I confirm my password
    Then I see "Password must have numbers"
    Then I see "Password must have special characters"
    Then I see "Password must have lower case letters"
    Then I see "Password must have at least 8 characters"
    And I confirm "Password must have numbers" error is accessible in new password field
