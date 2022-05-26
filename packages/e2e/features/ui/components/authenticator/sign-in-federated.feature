Feature: Sign In with Federation

  Authenticator supports sign in with social provider, including Amazon, Apple,
  Facebook, and Google.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-federated"

  @angular @react @vue
  Scenario: Sign In screen has social providers
    Then I see "Sign In with Amazon"
    And I see "Sign In with Apple"
    And I see "Sign In with Facebook"
    And I see "Sign In with Google"

  @angular @react @vue
  Scenario: Sign Up screen has social providers
    When I click the "Create Account" tab
    Then I see "Sign Up with Amazon"
    And I see "Sign Up with Apple"
    And I see "Sign Up with Facebook"
    And I see "Sign Up with Google"
