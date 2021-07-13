Feature: Sign In with TOTP MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  @React
  Scenario: Sign in using a valid email and TOTP MFA
    When I type a valid email "VALID_EMAIL"
    And I type a valid password "VALID_PASSWORD"
    And I click the "Sign In" button
    Then I will be redirected to the confirm totp mfa page
    
  @React
  Scenario: Sign in with invalid credentials
    When I type an invalid email "INVALID_EMAIL"
    And I type an invalid password "INVALID_PASSWORD"
    And I click the "Sign In" button
    Then I see "User does not exist"

  @React
  Scenario: Sign in with valid credentials that have not set up TOTP MFA
    When I type a valid email "VALID_EMAIL_SETUP_MFA"
    And I type a valid password "VALID_PASSWORD_SETUP_MFA"
    And I click the "Sign In" button
    Then I will be redirected to the setup mfa page