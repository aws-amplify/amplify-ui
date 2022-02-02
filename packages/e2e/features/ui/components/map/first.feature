Feature: First Feature

  Just a sample first feature test.

  Background:
    Given I'm running the example "ui/components/map/basic-map"

  @react
  Scenario: Interact with the map
    When I drag the map
    Then I see the viewport change
    When I zoom in on the map
    Then I see the viewport change
