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
    Then I check to see if QR code is correct
    Then I see the "Confirm" button

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
  Scenario: Setup TOTP should only show one input code
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign In" button
    And I see one code input

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

@angular @react @vue
  Scenario: Successful sign up shows correct username from authenticated user
    When I click the "Create Account" tab
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    And I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Confirmation Code"
    And I type a valid confirmation code
    And I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    And I click the "Confirm" button
    And I mock "autoSignIn" event with fixture "Auth.signIn-mfa-setup"
    Then I see "Setup TOTP"
    Then I see "Code"
    And I type a valid confirmation code
    And I mock 'Amplify.Auth.verifyTotpToken' with fixture "Auth.verifyTOTP"
    And I click the "Confirm" button
    Then I see "AmplifyUsername"

