Feature: Sign Up with Email

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address and password.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-email"
    When I click the "Create account" button

  @next @react @vue @angular
  Scenario: Login mechanism set to "email"
    Then I see "Email" as an input field
    And I don't see "Username" as an input field
    And I don't see "Phone Number" as an input field

  @next @react @vue @angular @skip
  Scenario: Sign up with valid email & password
    When I type my "email" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Confirmation Code"
