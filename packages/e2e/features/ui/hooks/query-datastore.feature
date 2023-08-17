Feature: useDataStore hook

  The useDataStore hook performs collection or single record queries against a DataStore model
  The criteria for the query is a DataStore compatible predicate function created by the createDataStorePredicate util from an object representation

  @react
  Scenario: DataStore filters work correctly for collections and single records
    Given I'm running the example "ui/hooks/useDataStore/filter"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then the page contains filtered buttons
    Then I don't see 'Toddler'
    Then I don't see 'Test'

  @react
  Scenario: DataStore sort and pagination work correctly
    Given I'm running the example "ui/hooks/useDataStore/sort"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see "Sign out"
    Then the page contains sorted buttons
    Then I don't see 'User0'   
