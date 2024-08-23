Feature: Stand-alone providers

  FederatedIdentities supports stand-alone sign in with social provider, including Amazon,
  Facebook, and Google.

  Background:
    Given I'm running the example "ui/components/federated-identities/stand-alone/"

  @react
  Scenario: Sign In screen has social providers
    Then I see "Sign In with Amazon"
    Then I see "Sign In with Facebook"
    Then I see "Sign In with Google"
