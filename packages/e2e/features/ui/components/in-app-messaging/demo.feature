Feature: In-App Messaging demo page to show banners with various configurations

  Testing In-App Messaging demo page to show banners with various configurations.

  Background:
    Given I'm running the example "ui/components/in-app-messaging/demo"

  # @react
  # Scenario: Verify that the default banner is top banner with primary and secondary buttons
  #   Given "Has Primary Button" checkbox is checked
  #   And "Has Secondary Button" checkbox is checked
  #   And "TOP_BANNER" layout radio option is selected
  #   When I click the "Display Demo Message" button
  #   Then I see banner on the top
  #   And the banner has 2 buttons
  #   When I click the x button on the banner
  #   Then I do not see the banner

  # @react
  # Scenario: Verify that the banner has expected number of buttons
  #   When I uncheck "Has Secondary Button" checkbox
  #   And I click the "Display Demo Message" button
  #   Then I see banner on the top
  #   And the banner has 1 buttons
  #   When I click the x button on the banner
  #   Then I do not see the banner
  #   When I uncheck "Has Primary Button" checkbox
  #   And I click the "Display Demo Message" button
  #   Then I see banner on the top
  #   And the banner has 0 buttons
  #   When I click the x button on the banner
  #   Then I do not see the banner

  # @react
  # Scenario: Verify that the banner is shown as a modal
  #   When I click the "MODAL" layout radio option
  #   And I click the "Display Demo Message" button
  #   Then I see banner as a modal
  #   When I click the x button on the banner
  #   Then I do not see the banner

  @react
  Scenario: Verify that top banner is shown on TOP_BANNER analytic event
    When I uncheck "Use Analytic events" checkbox
    And "MIDDLE_BANNER" radio option is selected
    And I click the "Display Demo Message" button
    Then I see banner on the top

