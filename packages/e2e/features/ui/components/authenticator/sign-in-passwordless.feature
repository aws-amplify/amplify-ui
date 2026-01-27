Feature: Sign In with Passwordless Authentication

  Authenticator supports passwordless authentication methods including Email OTP,
  SMS OTP, and WebAuthn (passkeys). When multiple methods are available, users
  can select their preferred authentication method.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-passwordless"

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
    Then I see "Sign in with Email"
    Then I see "Other sign-in options"
    Then I click the "Sign in with Email" button
    Then I see "Code"
    Then I type a valid email confirmation code
    Then I click the "Confirm" button
    Then I see "Sign out"

  @react
  Scenario: Forgot password link is available in passwordless mode
    When I type my "email" with status "CONFIRMED"
    Then I see "Forgot your password?"
    When I click the "Forgot your password?" button
    Then I see "Send code"

  @react
  Scenario: Preferred auth method EMAIL_OTP hides password field
    Then the email field is visible
    Then the password field is not visible
