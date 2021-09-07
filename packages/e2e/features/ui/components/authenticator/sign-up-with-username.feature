Feature: Sign Up with Username

  Create a new user in the Amazon Cognito UserPool by passing the new user’s username and password.

  Background:
    Given I'm using the example "ui/components/authenticator/sign-in-with-username"
    And I click "Create account"


  @angular @next @react @vue
  Scenario: Login mechanism set to "username"
    Then I see "Username" as an input field
    And I don't see "Email" as an input field
    And I don't see "Phone Number" as an input field

  # Sign up tests skipped due to SES limits
  @angular @next @react @vue @skip
  Scenario: Sign up with valid username & password
    When I type the username "VALID_USERNAME"
    And I type the password "VALID_PASSWORD"
    And I confirm the password "VALID_PASSWORD"
    And I click the "Create Account" button
    Then I see "Confirmation Code"
