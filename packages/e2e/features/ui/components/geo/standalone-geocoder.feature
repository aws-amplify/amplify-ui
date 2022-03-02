Feature: Standalone Geocoder

  Testing geocoder without an attached map.

  Background:
    Given I'm running the example "ui/components/geo/standalone-geocoder"
    And my default search results is 5

  @react
  Scenario: Shows results while typing
    When I search for "Amazon Go"
    Then I see results equal to my default search results

  @react
  Scenario: Select a single result
    When I search for "Amazon Go"
    And I select the first search result
    Then I see no search results
    And the search input is not empty

  @react
  Scenario: Clear search results
    When I search for "Amazon Go"
    And I clear the search results
    Then I see no search results
    And the search input is empty

