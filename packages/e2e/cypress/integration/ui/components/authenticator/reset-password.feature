Feature: Reset Password

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  @next @react
  Scenario: Reset Password with valid username
    When I click on the "Reset Password" button
    And I type a valid username "VALID_USERNAME"
    And I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    
  @next @react
  Scenario: Reset Password with invalid username
    When I click on the "Reset Password" button
    And I type an invalid username "INVALID_USERNAME"
    And I click the "Send code" button
    Then I see "Username/client id combination not found."
