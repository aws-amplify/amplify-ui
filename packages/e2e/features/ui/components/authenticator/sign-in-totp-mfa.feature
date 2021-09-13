Feature: Sign In with TOTP MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  Scenario: Sign in using a valid email and TOTP MFA
    When I type my "email" with status "UNCONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the confirm totp mfa page
    
  @angular @next @vue
  Scenario: Sign in with uknown credentials
    When I type my "email" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  Scenario: Sign in with valid credentials that have not set up TOTP MFA
    When I type my "phone number" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the setup mfa page

  Scenario: Incorrect TOTP code
    When I type a my "phone number" with status "CONFIRMED"
    And I type my password
    And I enter an incorrect confirmation code
    And I click the "Sign In" button
    Then I see 'Resend Code'
