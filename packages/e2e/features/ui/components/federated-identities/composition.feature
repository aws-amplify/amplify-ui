Feature: Composable FederatedIdentities

  FederatedIdentities supports composition while maintaining sign in with social provider, including Amazon,
  Facebook, and Google.

  Background:
    Given I'm running the example "ui/components/federated-identities/composition"

  @react
  Scenario: Sign In screen has social providers
    Then I see "Here is a google button:"
    Then I see "Sign In with Google"
    Then I see "Here is an amazon button"
    Then I see "Click here to sign in with Amazon!"
