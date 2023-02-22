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
    Then I see banner at the "top"
    And the banner has 2 buttons
    When I click the x button on the banner
    Then I do not see the banner

  @react
  Scenario: Verify that the banner has expected number of buttons
    When I toggle "Has Secondary Button" checkbox
    And I click the "Display Demo Message" button
    Then I see banner at the "top"
    And the banner has 1 buttons
    When I click the x button on the banner
    Then I do not see the banner
    When I toggle "Has Primary Button" checkbox
    And I click the "Display Demo Message" button
    Then I see banner at the "top"
    And the banner has 0 buttons
    When I click the x button on the banner
    Then I do not see the banner

  @react
  Scenario: Verify that the banner is shown as a bottom banner
    When I click the "BOTTOM_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the "bottom"

  @react
  Scenario: Verify that the banner is shown as a middle banner
    When I click the "MIDDLE_BANNER" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner at the "middle"

  @react
  Scenario: Verify that the banner is shown as a modal
    When I click the "MODAL" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner as a modal

  @react
  Scenario: Verify that fullscreen banner is shown on FULL_SCREEN analytic event
    When I click the "FULL_SCREEN" layout radio option
    And I click the "Display Demo Message" button
    Then I see banner as fullscreen

  @react
  Scenario: Verify that top banner is shown with an image
    Given "Has Image" checkbox is checked
    And "TOP_BANNER" layout radio option is selected
    When I click the "Display Demo Message" button
    Then I see banner at the "top"
    And the banner has an image

