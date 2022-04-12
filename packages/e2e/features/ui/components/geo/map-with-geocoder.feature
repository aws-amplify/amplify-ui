Feature: Map with Geocoder

  Testing map with geocoder.

  Background:
    Given I'm running the example "ui/components/geo/map-with-geocoder"
    And my default search results is 5

  @react
  Scenario: Map markers for search results
    When I search for "Amazon Go"
    And I press the enter key
    Then I see markers equal to my default search results

  @react
  Scenario: Single map marker
    When I search for "Amazon Go"
    And I select the first search result
    Then I see one marker

  @react
  Scenario: Marker information popup
    When I search for "Amazon Go"
    And I press the enter key
    And I click on a map marker
    Then I see an information popup

  @react
  Scenario: Clear search results
    When I search for "Amazon Go"
    And I select the first search result
    And I clear the search results
    Then I see no map markers
    And I see no search results
    And the search input is empty

