Feature: In-App Messaging with all types of banners

  Testing In-App Messaging with all types of banners.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/basic-usage-all-banners"

  @react
  Scenario: Check if message is displayed as a top banner
    When I select the message type as top banner
    And I click on Display message button
    Then I see a banner displayed on the top of the page
