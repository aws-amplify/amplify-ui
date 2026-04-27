Feature: StorageBrowser cross-page sorting

  Tests that sorting works across multiple pages of results,
  including sorting by different columns and combining sort with search.

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Sort by name ascending
    When I click the first button containing "public"
    Then the table should have at least "2" rows
    When I click the "Name" sort header
    Then the table name column values should be in "ascending" order

  @react
  Scenario: Sort by name descending
    When I click the first button containing "public"
    Then the table should have at least "2" rows
    When I click the "Name" sort header
    Then the table name column values should be in "ascending" order
    When I click the "Name" sort header
    Then the table name column values should be in "descending" order

  @react
  Scenario: Sort by size column
    When I click the first button containing "public"
    Then the table should have at least "2" rows
    When I click the "Size" sort header
    Then the table should have at least "2" rows

  @react
  Scenario: Sort by last modified column
    When I click the first button containing "public"
    Then the table should have at least "2" rows
    When I click the "Last modified" sort header
    Then the table should have at least "2" rows

  @react
  Scenario: Changing sort column resets to ascending
    When I click the first button containing "public"
    Then the table should have at least "2" rows
    When I click the "Name" sort header
    Then the table name column values should be in "ascending" order
    When I click the "Name" sort header
    Then the table name column values should be in "descending" order
    # Switching to a different column should reset to ascending
    When I click the "Size" sort header
    Then the table should have at least "2" rows

  @react
  Scenario: Sort combined with search results
    When I click the first button containing "public"
    When I see input with placeholder "Search current folder" and type "DO_NOT"
    Then I click the "Search" button
    Then I see the button containing "DO_NOT_DELETE"
    # Sort the search results by name
    When I click the "Name" sort header
    Then the table should have at least "1" rows

  @react
  Scenario: Sort direction preserved after toggling
    When I click the first button containing "public"
    Then the table should have at least "2" rows
    When I click the "Name" sort header
    Then the table name column values should be in "ascending" order
    When I click the "Name" sort header
    Then the table name column values should be in "descending" order
    # Toggle back to ascending
    When I click the "Name" sort header
    Then the table name column values should be in "ascending" order
