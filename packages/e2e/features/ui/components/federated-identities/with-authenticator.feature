Feature: Composition with Authenticator

  Authenticator supports composition with FederatedIdentities component, and sign in with social provider, including Amazon,
  Facebook, and Google.

  Background:
    Given I'm running the example "ui/components/federated-identities/with-authenticator/"

  @react
  Scenario: Sign In screen has social providers
    Then I see "Sign In with Amazon"
    Then I see "Sign In with Facebook"
    Then I see "Sign In with Google"

  @react
  Scenario: Sign Up screen has social providers
    When I click the "Create Account" tab
    Then I see "Sign Up with Amazon"
    Then I see "Sign Up with Facebook"
    Then I see "Sign Up with Google"
