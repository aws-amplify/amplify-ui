Feature: Sign Up with Username

  Create a new user in the Amazon Cognito UserPool by passing the new user’s email address, password, and other attributes.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-up-with-username"
    And I click the Create Account tab

  @todo-angular @react @todo-vue
  Scenario: Login mechanism set to "username"
    Then I see "Username" as an input field
    And I see "Email" as an input field
    And I see "Phone Number" as an input field

  # Sign up tests skipped due to SES limits
  @angular @react @vue
  Scenario: Sign up with valid username & password
    # This becomes a random username
    When I type my "username" with status "UNKNOWN"
    And I type my password
    And I confirm my password
    And I type my "email" with status "UNCONFIRMED"
    And I type my "phone number" with status "UNCONFIRMED"
    And I click the "Create Account" button
    Then I see "Confirm Sign Up"
    And I see "Confirmation Code"

  @todo-angular @react @todo-vue
  Scenario: Username field autocompletes username
    Then "Username" field autocompletes "username"

  @todo-angular @react @todo-vue
  Scenario: Password fields autocomplete "new-password"
    Then "Password" field autocompletes "new-password"
    And "Confirm Password" field autocompletes "new-password"
