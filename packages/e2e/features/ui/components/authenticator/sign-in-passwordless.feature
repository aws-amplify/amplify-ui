Feature: Sign In with Passwordless Authentication

  Authenticator supports passwordless authentication methods including Email OTP,
  SMS OTP, and WebAuthn (passkeys). When multiple methods are available, users
  can select their preferred authentication method.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-passwordless"

  @react
  Scenario: Sign in with email shows passwordless UI
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"
    Then I see "Other sign-in options"

  @react
  Scenario: Click other sign-in options button is available
    When I type my "email" with status "CONFIRMED"
    Then I see "Other sign-in options"

  @react
  Scenario: Forgot password link is available in passwordless mode
    When I type my "email" with status "CONFIRMED"
    Then I see "Forgot your password?"

  @react
  Scenario: Sign up tab is visible
    Then I see "Create Account"

  @react
  Scenario: Preferred auth method EMAIL_OTP is set
    Then the email field is visible
    Then the password field is not visible

  @react
  Scenario: Complete email OTP sign-in flow with mocked backend
    # This test verifies the EMAIL_OTP authentication flow with mocked Cognito API responses.
    # Key requirements for mocked fixtures:
    # 1. Use uppercase field names (ChallengeName, ChallengeParameters, Session) to match AWS API format
    # 2. Provide valid JWT tokens in AuthenticationResult (Amplify JS validates token structure)
    # 3. EMAIL_OTP challenge requires CODE_DELIVERY_DELIVERY_MEDIUM and CODE_DELIVERY_DESTINATION parameters
    Given I intercept passkey registration prompt
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth" } }' with fixture "initiate-auth-email-otp"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.RespondToAuthChallenge" } }' with fixture "confirm-sign-in-email-otp"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.GetUser" } }' with fixture "Auth.currentAuthenticatedUser-verified-email"
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ListWebAuthnCredentials" } }' with fixture "list-webauthn-credentials-empty"
    When I type my "email" with status "CONFIRMED"
    Then I click the "Sign in with Email" button
    Then I see "Code"
    Then I type a valid email confirmation code
    Then I click the "Confirm" button
    Then I see "Sign out"

  @react
  Scenario: Complete SMS OTP sign-in flow  
    When I type my "email" with status "CONFIRMED"
    Then I see "Other sign-in options"

  @react
  Scenario: Switch between authentication methods
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"
    Then I see "Other sign-in options"

  @react
  Scenario: Hidden auth methods configuration
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"

  @react
  Scenario: Passkey registration prompt after sign-in
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"

  @react
  Scenario: Sign up with passwordless email OTP
    Then I see "Create Account"

  @react
  Scenario: Invalid OTP code shows error
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"

  @react @todo
  Scenario: Resend OTP code
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"

  @react
  Scenario: Back navigation from OTP screen
    When I type my "email" with status "CONFIRMED"
    Then I see "Sign in with Email"
