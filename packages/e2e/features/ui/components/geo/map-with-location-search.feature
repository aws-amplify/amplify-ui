Feature: Map with LocationSearch

  Testing map with LocationSearch.

  Background:
    Given I'm running the example "ui/components/geo/map-with-location-search"
    Then my default search results is 5

  @react @gen1 @gen2
  Scenario: Map markers for search results
    When I search for "Amazon Go"
    Then I press the enter key
    Then I see markers equal to my default search results

  @react @gen1 @gen2
  Scenario: Single map marker
    When I search for "Amazon Go"
    Then I select the first search result
    Then I see one marker

  @react @gen1 @gen2
  Scenario: Marker information popup
    When I search for "Amazon Go"
    Then I press the enter key
    Then I click on a map marker
    Then I see an information popup

  @react @gen1 @gen2
  Scenario: Clear search results
    When I search for "Amazon Go"
    Then I clear the search results
    Then I see no map markers
    Then I see no search results
    Then the search input is empty

