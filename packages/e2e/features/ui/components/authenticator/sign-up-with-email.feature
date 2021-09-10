Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm using the example "ui/components/authenticator/sign-up-with-email"
    And I click "Create account"

  @next @react @vue @angular
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

  @next @react @vue @angular @skip
  Scenario: Sign up with valid email & password
    When I type the email "VALID_EMAIL"
    And I type the password "VALID_PASSWORD"
    And I confirm the password "VALID_PASSWORD"
    And I click the "Create Account" button
    Then I see "Confirmation Code"

  @next @react @vue @angular
  Scenario: Email field autocompletes username

  On sign up form, autocomplete prefers usage of username instead of email. 
  See https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands.

    And "Email" field autocompletes "username"

  @next @react @vue @angular
  Scenario: Password fields autocomplete "new-password"
    And "Password" field autocompletes "new-password"
    And "Confirm Password" field autocompletes "new-password"
    