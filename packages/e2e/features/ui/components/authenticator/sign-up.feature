Feature: Sign Up

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address, password, and other attributes.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up"
    When I click the "Create account" button

  @next @react @vue @angular
  Scenario: Login mechanism set to "phone_number"
    Then I see "Username" as an input field
    And I see "Email" as an input field
    And I see "Phone Number" as an input field

  @next @react @vue @angular @skip
  Scenario: Sign up with valid username & password
    When I type my "username" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I type my "email" with status "UNCONFIRMED"
    And I type my "phone_number" with status "UNCONFIRMED"
    And I click the "Create Account" button
    Then I see "Confirmation Code"
