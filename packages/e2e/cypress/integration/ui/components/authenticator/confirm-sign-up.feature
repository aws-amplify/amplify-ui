@skip
Feature: Confirm Sign Up

  If you enabled multi-factor auth, confirm the sign-up after retrieving a confirmation code from the user.

  See: https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js#confirm-sign-up

  Background:
    Given I'm running the example "ui/components/authenticator/confirm-sign-up"

  @next @react
  Scenario: Username is disabled
    When I see "Confirm Sign Up"
    Then The input "username" is disabled

  @next @react
  Scenario: Navigating back to "Sign In"
    When I click "Back to Sign In"
    Then I see "Sign In"

  @next @react
  Scenario: Resending Code
    When I click "Resend Code"
    Then A new code is sent

  @next @react
  Scenario: Confirming a Code
    When I type the confirmation code
    And I click the "Confirm" button
    Then I am logged in

  @next @react
  Scenario: Sign up with a new username & password
    When I type a new username
    And I type the password "test-password"
    And I type the email "test@example.com"
    And I type the phone number "+15558675309"
    And I click the "Create Account" button
    Then I see "Confirm Sign Up"
    And I see "Confirmation Code"

  @next @react
  Scenario: Supports "One-Time Code"

    See: https://developer.apple.com/documentation/security/password_autofill/enabling_password_autofill_on_an_html_input_element

    When I see "Confirmation Code"
    Then The "confirmation_code" input autocompletes "one-time-code"
