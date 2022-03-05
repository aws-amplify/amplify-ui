Feature: Sign In with TOTP MFA

  If your backend has TOTP MFA required, Authenticator will redirect end users to 
  TOTP confirmation screen when they try to sign in.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  @angular @react @vue
  Scenario: Sign in with valid credentials that have not set up TOTP MFA
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I will be redirected to the setup totp page

  @angular @react @vue
  Scenario: Redirect to sign in page
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    And I click the "Back to Sign In" button
    Then I see "Sign in"
  
  @angular @react @vue
  Scenario: Invalid TOTP code
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign In" button
    And I enter an invalid confirmation code
    And I click the "Confirm" button
    Then I see 'Code mismatch'

  @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    And I type my password
    And I click the "Sign in" button
    Then I see "User does not exist"

  @angular @react @vue
  Scenario: Sign in with force change password with mfa setup
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    When I type my "email" with status "FORCE_CHANGE_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"
    And I type my password
    And I confirm my password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-mfa-setup"
    And I click the "Change Password" button
    Then I see "Setup TOTP"


