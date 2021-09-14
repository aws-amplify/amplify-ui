Feature: Reset Password

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  @angular @react @vue
  Scenario: Reset Password with valid username
    When I click the "Forgot your password?" button
    And I type my "username" with status "CONFIRMED"
    And I click the "Send code" button
    Then I will be redirected to the confirm forgot password page
    
  @angular @react @vue
  Scenario: Reset Password with invalid username
    When I click the "Forgot your password?" button
    And I type my "username" with status "UNKNOWN"
    And I click the "Send code" button
    Then I see "Username/client id combination not found."
