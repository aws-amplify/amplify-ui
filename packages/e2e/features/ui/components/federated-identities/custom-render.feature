Feature: Stand-alone providers

  FederatedIdentities supports custom render function to render buttons in group

  Background:
    Given I'm running the example "ui/components/federated-identities/custom-render/"

  @react
  Scenario: Sign In screen has social providers
    Then I see "Click here for Amazon login!"
    Then I see "Click here for Facebook login!"
    Then I see "Click here for Google login!"
