Feature: In-App Messaging with style overrides on the default banner

  Testing In-App Messaging with style overrides on the default banner.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/override-styling"

  @react
  Scenario: Verify that message is displayed on the banner with style override
    When I click the "Display Custom Modal Message" button
    Then I see the message on the banner with style override
    When I dismiss the banner
    Then I do not see the banner
