Feature: useDataStore hook

  The useDataStore hook works correctly

  @react
  Scenario: DataStore filters work correctly
    Given I'm running the example "ui/hooks/useDataStore/filter"
    Then the page contains filtered buttons
    And I don't see 'Toddler'
    And I don't see 'Test'

  @react
  Scenario: DataStore sort works correctly
    Given I'm running the example "ui/hooks/useDataStore/sort"
    Then the page contains sorted buttons
    And I don't see 'User0'   
