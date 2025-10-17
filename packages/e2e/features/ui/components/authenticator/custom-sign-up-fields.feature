Feature: Custom Sign Up Fields

  A custom Sign Up form with "Preferred Username" and a T&C checkbox are validated & submitted with the default fields.

  Background:
    Given I'm running the example "ui/components/authenticator/custom-sign-up-fields"
    Then I see "Preferred Username" as an input field
    Then I see "I agree with the Terms and Conditions"

  @angular @react @vue @svelte
  Scenario: Form is invalid by default
    When I see "You must agree to the Terms and Conditions"
    Then the "Create Account" button is disabled

  @angular @react @vue @svelte
  Scenario: Form performs default validation like Confirm Password
    When I type a new "email"
    Then I type an invalid password
    Then I confirm my password
    Then I see "Your passwords must match"
    Then I click the "I agree with the Terms and Conditions" checkbox
    Then I don't see "You must agree to the Terms and Conditions"
    Then the "Create Account" button is disabled

  @angular @react @vue @svelte
  Scenario: Form is valid when I check the Terms and Conditions checkbox, but missing `preferred_username` for Cognito
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with error fixture "custom-sign-up-fields-missing-preferred_username"
    When I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "I agree with the Terms and Conditions" checkbox
    Then I click the "Create Account" button
    Then the "Preferred Username" field is invalid

  @angular @react @vue @svelte
  Scenario: Form successfully submits with `preferred_username` and Terms and Conditions checked
    Given I intercept '{ "headers": { "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp" } }' with fixture "custom-sign-up-fields"
    When I type a new "preferred username"
    Then I type a new "email"
    Then I type my password
    Then I confirm my password
    Then I click the "I agree with the Terms and Conditions" checkbox
    Then I click the "Create Account" button
    Then I see "Confirmation Code"
