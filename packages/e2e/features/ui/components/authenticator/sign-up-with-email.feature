Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"
    And I click "Create account"

  @angular @next @vue
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

  Scenario: Sign up with valid email & password
    When I type my "email" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Confirmation Code"
