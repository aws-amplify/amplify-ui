Feature: Sign Up

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address, password, and other attributes.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up"
    And I click "Create account"
    Then I see "Create a new account"

  # Sign up tests skipped due to SES limits
  @angular @next @react @vue @skip
  Scenario: Sign up with a new username & password
    When I type a new username
    And I type a new password
    And I type a new confirm password
    And I type the email "test@example.com"
    And I type the phone number "+15558675309"
    And I click the "Create Account" button
    Then I see "Confirm Sign Up"
    And I see "Confirmation Code"

  @angular @next @vue
  Scenario: Redirect to Sign In
    When I click the "Sign in" button
    Then I see "Sign in to your account"
