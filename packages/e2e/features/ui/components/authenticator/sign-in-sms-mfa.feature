Feature: Sign In with SMS MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-sms-mfa"

  @next @react @vue @skip
  Scenario: Sign in using a valid phone number and SMS MFA
    When I type a valid phone number "VALID_PHONE_NUMBER"
    And I type a valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I will be redirected to the confirm sms mfa page
    
  @next @react @angular
  Scenario: Sign in with invalid credentials
    When I type an invalid username "INVALID_PHONE_NUMBER"
    And I type an invalid password "INVALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"
