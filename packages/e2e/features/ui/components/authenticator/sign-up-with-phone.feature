Feature: Sign Up with Phone 

  Create a new user in the Amazon Cognito UserPool by passing the new user’s phone number and password.

  Background:
    Given I'm using the example "ui/components/authenticator/sign-up-with-phone/"
    And I click "Create account"

  @next @react @vue @angular
  Scenario: Login mechanism set to "phone_number"
    Then I see "Phone Number" as an input field
    And I don't see "Username" as an input field
    And I don't see "Email" as an input field

  @next @react @vue @angular @skip
  Scenario: Sign up with valid phone number & password
    When I select the country code "+1"
    And I type my "phone_number" with status "UNCONFIRMED"
    And I type my password
    And I confirm my password
    And I click the "Create Account" button
    Then I see "Confirmation Code"
