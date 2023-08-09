Feature: Sign In with TOTP MFA

  If your backend has TOTP MFA required, Authenticator will redirect end users to 
  TOTP confirmation screen when they try to sign in.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-totp-mfa"

  @angular @react @vue
  Scenario: Sign in with valid credentials that have not set up TOTP MFA
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I will be redirected to the setup totp page
    Then I check to see if QR code is correct
    Then I see the "Confirm" button

  @angular @react @vue
  Scenario: Redirect to sign in page
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the "Back to Sign In" button
    Then I see "Sign in"
  
  @angular @react @vue
  Scenario: Invalid TOTP code
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign In" button
    Then I enter an invalid confirmation code
    Then I click the "Confirm" button
    Then I see 'Code mismatch'

  @angular @react @vue
  Scenario: Setup TOTP should only show one input code
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign In" button
    Then I see one code input

  @angular @react @vue
  Scenario: Sign in with unknown credentials
    When I type my "email" with status "UNKNOWN"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "User does not exist"

  @angular @react @vue
  Scenario: Sign in with force change password with mfa setup
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password"
    When I type my "email" with status "FORCE_CHANGE_PASSWORD"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Change Password"
    Then I type my password
    Then I confirm my password
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "force-change-password-mfa-setup"
    Then I click the "Change Password" button
    Then I see "Setup TOTP"

@angular @react @vue
  Scenario: Successful sign up shows correct username from authenticated user
    When I click the "Create Account" tab
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    Then I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "Create Account" button
    Then I see "Confirmation Code"
    Then I type a valid confirmation code
    Then I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-with-email"
    Then I click the "Confirm" button
    Then I mock "autoSignIn" event with fixture "Auth.signIn-mfa-setup"
    Then I see "Setup TOTP"
    Then I see "Code"
    Then I type a valid confirmation code
    Then I mock 'Amplify.Auth.verifyTotpToken' with fixture "Auth.verifyTOTP"
    Then I click the "Confirm" button
    Then I see "AmplifyUsername"

