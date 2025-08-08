Feature: Authenticator Component for Svelte

  Amplify UI Authenticator provides a complete authentication flow for Svelte applications.

  Background:
    Given I'm running the example "ui/components/authenticator/svelte"

  @svelte @react @vue @angular
  Scenario: Sign in with valid credentials
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"

  @svelte @react @vue @angular
  Scenario: Sign in with wrong credentials
    When I type my "username" with status "CONFIRMED"
    And I type an invalid password
    And I click the "Sign in" button
    Then I see "Incorrect username or password"

  @svelte @react @vue @angular
  Scenario: Sign up a new user
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "sign-up-with-email"
    When I click the "Create Account" tab
    And I type a new "username"
    And I type my password
    And I confirm my password
    And I type my "email" with value "test@example.com"
    And I click the "Create Account" button
    Then I see "Confirm Sign Up"

  @svelte @react @vue @angular
  Scenario: Confirm sign up
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp" } }' with fixture "confirm-sign-up-success"
    And I'm at the "Confirm Sign Up" page
    When I type a valid confirmation code
    And I click the "Confirm" button
    Then I see "Sign In"

  @svelte @react @vue @angular
  Scenario: Reset password
    When I click the "Forgot your password?" button
    Then I see "Reset your password"
    When I type my "username" with status "CONFIRMED"
    And I click the "Send Code" button
    Then I see "Reset your password"

  @svelte @react @vue @angular
  Scenario: Force new password flow
    When I type my "username" with status "FORCE_NEW_PASSWORD"
    And I type my password
    And I click the "Sign in" button
    Then I see "Change Password"

  @svelte @react @vue @angular
  Scenario: Setup TOTP flow
    When I type my "username" with status "TOTP_SETUP"
    And I type my password
    And I click the "Sign in" button
    Then I see "Setup Two-Factor Authentication"

  @svelte @react @vue @angular
  Scenario: Sign in with federated provider
    Given "google" login is enabled
    Then I see the "Sign in with Google" button

  @svelte @react @vue @angular
  Scenario: Hide sign up
    Given "hideSignUp" is enabled
    Then I don't see "Create Account"

  @svelte @react @vue @angular
  Scenario: Custom slot content when authenticated
    When I type my "username" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Hello testuser"
    And I see custom authenticated content