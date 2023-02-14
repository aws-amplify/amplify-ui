Feature: In-App Messaging with a custom component overriding the default banner

  Testing In-App Messaging with a custom component overriding the default banner.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/override-component"

  @react
  Scenario: Verify that message is displayed on the custom component
    When I click the "Display Custom Banner Message" button
    Then I see the message on the custom component
    When I click the "Close!" button
    Then I do not see the custom component
