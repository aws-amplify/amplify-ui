Feature: useDataStore hook

  The useDataStore hook works correctly

  @react
  Scenario: DataStore filters work correctly
    Given I'm running the example "ui/hooks/useDataStore/filter"
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And the page contains filtered buttons
    And I don't see 'Toddler'
    And I don't see 'Test'

  @react
  Scenario: DataStore sort works correctly
    Given I'm running the example "ui/hooks/useDataStore/sort"
    When I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    Then I see "Sign out"
    And the page contains sorted buttons
    And I don't see 'User0'   
