Feature: Map with Marker Popup

  Testing map with a marker and popup from react-map-gl.

  Background:
    Given I'm running the example "ui/components/geo/map-with-marker-popup"
    And the map is loaded

  @react
  Scenario: Popup Appears when Marker Is Clicked
    When I click on a map marker
    Then I see a popup about the marker appear
    When I close the popup box
    Then I no longer see the popup
