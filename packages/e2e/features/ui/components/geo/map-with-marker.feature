Feature: Map with Marker

  Testing map with a marker.

  Background:
    Given I'm running the example "ui/components/geo/map-with-marker"

  @react
  Scenario: Default marker matches Geocoder
    When I search for "Amazon Go"
    And I select the first search result
    Then I see the same style of marker by default
