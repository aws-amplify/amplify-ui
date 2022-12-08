Feature: Custom Sign Up Fields

  A custom Sign Up form with "Preferred Username" and a T&C checkbox are validated & submitted with the default fields.

  Background:
    Given I'm running the example "ui/components/authenticator/custom-sign-up-fields"
    And I see "Preferred Username" as an input field
    And I see "I agree with the Terms & Conditions"

 @angular @react @vue
  Scenario: Form is invalid by default
    When I see "You must agree to the Terms & Conditions"
    Then the "Create Account" button is disabled

  @angular @react @vue
  Scenario: Form performs default validation like Confirm Password
    When I type a new "email"
    And I type an invalid password
    And I confirm my password
    Then I see "Your passwords must match"
    And I click the "I agree with the Terms & Conditions" checkbox
    Then I don't see "You must agree to the Terms & Conditions"
    And the "Create Account" button is disabled

  @angular @react @vue
  Scenario: Form is valid when I check the Terms & Conditions checkbox, but missing `preferred_username` for Cognito
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with error fixture "custom-sign-up-fields-missing-preferred_username"
    When I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "I agree with the Terms & Conditions" checkbox
    And I click the "Create Account" button
    Then the "Preferred Username" field is invalid

  @angular @react @vue
  Scenario: Form successfully submits with `preferred_username` and Terms & Conditions checked
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "custom-sign-up-fields"
    When I type a new "preferred username"
    And I type a new "email"
    And I type my password
    And I confirm my password
    And I click the "I agree with the Terms & Conditions" checkbox
    And I click the "Create Account" button
    Then I see "Confirmation Code"
