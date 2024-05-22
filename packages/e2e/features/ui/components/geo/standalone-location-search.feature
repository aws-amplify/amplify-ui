Feature: Standalone LocationSearch

  Testing LocationSearch without an attached map.

  Background:
    Given I'm running the example "ui/components/geo/standalone-location-search"
    Then my default search results is 5

  @react @gen1
  Scenario: Shows results while typing
    When I search for "Amazon Go"
    Then I see results equal to my default search results

  @react @gen1
  Scenario: Select a single result
    When I search for "Amazon Go"
    Then I select the first search result
    Then I see no search results
    Then the search input is not empty

  @react @gen1
  Scenario: Clear search results
    When I search for "Amazon Go"
    Then I clear the search results
    Then I see no search results
    Then the search input is empty

