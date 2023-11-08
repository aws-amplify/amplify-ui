Feature: Map with Moving Marker

  Testing map with a moving marker from react-map-gl.

  Background:
    Given I'm running the example "ui/components/geo/map-with-moving-marker"

  @todo-migration @react
  Scenario: Marker position updates
    When I see the position of a map marker
    Then I click a button to move the map marker
    Then I see the marker position update
