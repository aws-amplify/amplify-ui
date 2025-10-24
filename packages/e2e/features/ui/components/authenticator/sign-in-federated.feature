Feature: Sign In with Federation

  Authenticator supports sign in with social provider, including Amazon, Apple,
  Facebook, and Google.

  Background:
    Given I'm running the example "ui/components/authenticator/sign-in-federated"

  @angular @react @vue @svelte
  Scenario: Sign In screen has social providers
    Then I see "Sign In with Amazon"
    # Then I see "Sign In with Apple"
    Then I see "Sign In with Facebook"
    Then I see "Sign In with Google"

  @angular @react @vue @svelte
  Scenario: Sign Up screen has social providers
    When I click the "Create Account" tab
    Then I see "Sign Up with Amazon"
    # Then I see "Sign Up with Apple"
    Then I see "Sign Up with Facebook"
    Then I see "Sign Up with Google"
