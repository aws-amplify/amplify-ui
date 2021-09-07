Feature: Sign In with SMS MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"

  @next @react @vue @skip
  Scenario: Sign in using a valid phone number and SMS MFA
    When I type my "phone_number" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the confirm sms mfa page
    
  @next @react @angular
  Scenario: Sign in with invalid credentials
    When I type my "username" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"
