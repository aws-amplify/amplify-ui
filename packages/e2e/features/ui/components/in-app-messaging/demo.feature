Feature: In-App Messaging demo page to show banners with various configurations

  Testing In-App Messaging demo page to show banners with various configurations.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/demo"

  @react
  Scenario: Verify that the default banner is top banner with primary and secondary buttons
    Given "Has Primary Button" checkbox is checked
    And "Has Secondary Button" checkbox is checked
    And "TOP_BANNER" layout radio option is selected
    When I click the "Display Demo Message" button
    Then I see banner at the top
    And the banner has 2 buttons
    When I click the x button on the banner
    Then I do not see the banner

  @react
  Scenario: Verify that the banner has expected number of buttons
    When I toggle "Has Secondary Button" checkbox
    And I click the "Display Demo Message" button
    Then I see banner at the top
    And the banner has 1 buttons
    When I click the x button on the banner
    Then I do not see the banner
    When I toggle "Has Primary Button" checkbox
    And I click the "Display Demo Message" button
    Then I see banner at the top
    And the banner has 0 buttons
    When I click the x button on the banner
    Then I do not see the banner

  @react
  Scenario: Verify that the banner is shown as a modal
    When I click the "MODAL" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner as a modal
    When I click the x button on the banner
    Then I do not see the banner

  @react
  Scenario: Verify that top banner is shown on TOP_BANNER analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "TOP_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the top

  @react
  Scenario: Verify that bottom banner is shown on BOTTOM_BANNER analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "BOTTOM_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the bottom

  @react
  Scenario: Verify that middle banner is shown on MIDDLE_BANNER analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "MIDDLE_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner in the middle

  @react
  Scenario: Verify that modal banner is shown on MODAL analytic event
    When I toggle "Use Analytic events" checkbox
    And I wait for pinpoint messages to sync
    And I click the "MODAL" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner as a modal
