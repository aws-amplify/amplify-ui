Feature: In-App Messaging with a custom component overriding the default banner

  Testing In-App Messaging with a custom component overriding the default banner.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/override-component"

  @react
  Scenario: Verify that banner is displayed as a custom component on initial render
    When I see the custom component
    And I click the "Close!" button
    Then I do not see the custom component

  @react
  Scenario: Verify that banner is displayed as a custom component on button click
    When I click the "Display Custom Banner Message" button
    Then I see the custom component
    When I click the "Close!" button
    Then I do not see the custom component
