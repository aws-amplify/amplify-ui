Feature: Sign In with TOTP MFA

  Amplify's SignIn component uses AWS Cognito's authentication
  service to provide a sign in experience to your application's
  users.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  # Not functioning in angular
  @next @vue
  Scenario: Sign in with valid credentials that have not set up TOTP MFA
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the setup totp page

  # For angular, the "Back to Sign In" is not a button
  @next @vue
  Scenario: Redirect to sign in page
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Back to Sign In" button
    Then I see "Sign in to your account"
  
  # Here we should standardize accessible roles for confirmation code input
  # No error message shows up for React
  Scenario: Invalid TOTP code
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign In" button
    And I enter an invalid confirmation code
    And I click the "Confirm" button
    Then I see 'Code mismatch and fail enable Software Token MFA'

  @angular @next @vue
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"
