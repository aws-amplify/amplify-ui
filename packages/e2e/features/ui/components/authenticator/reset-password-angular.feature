Feature: Reset Password

  This will be used specifically for Angular users who have changed the translations for 'Send Code' for GH #1784.

  Background:
    Given I'm running the example "ui/components/authenticator/reset-password"

  @angular
  Scenario: Verify translated 'Send Code' button text is correct on Confirm Reset Password page
    When I type my "username" with status "CONFIRMED"
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ForgotPassword" } }' with fixture "reset-password"
    And I click the "Update Information" button
    Then I will be redirected to the confirm forgot password page
    And I see "Code"
    Then I type a valid code
    And I type my new password
    And I confirm my password
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmForgotPassword" } }' with fixture "confirm-reset-password"
    And I see "Update Information"


  @angular
  Scenario: Reset Password with invalid username
    When I type my "username" with status "UNKNOWN"
    And I click the "Update Information" button
    Then I see "Username/client id combination not found."

