Feature: In-App Messaging demo page to show banners with various configurations

  Testing In-App Messaging demo page to show banners with various configurations.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/demo"

  @react
  Scenario: Verify that top banner is shown on TOP_BANNER analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "TOP_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the "top"

  @react
  Scenario: Verify that bottom banner is shown on BOTTOM_BANNER analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "BOTTOM_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the "bottom"

  @react
  Scenario: Verify that middle banner is shown on MIDDLE_BANNER analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "MIDDLE_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the "middle"

  @react
  Scenario: Verify that modal banner is shown on MODAL analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "MODAL" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner as a modal

  @react
  Scenario: Verify that fullscreen banner is shown on FULL_SCREEN analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "FULL_SCREEN" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner as fullscreen
