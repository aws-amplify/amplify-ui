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
