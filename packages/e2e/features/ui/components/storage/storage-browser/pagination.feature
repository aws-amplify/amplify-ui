Feature: Storage Browser pagination

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth/pagination"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Standard mode with pageSize 5 shows 5 items per page
    When I select "5" from the "Global Page Size" dropdown
    And I wait 2 seconds
    And I click the first button containing "public"
    Then the table should have "5" rows only

  @react
  Scenario: Standard mode with pageSize 10 shows 10 items per page
    When I select "10" from the "Global Page Size" dropdown
    And I wait 2 seconds
    And I click the first button containing "public"
    Then the table should have "10" rows only

  @react
  Scenario: Composition mode detail view with pageSize 10 shows 10 items per page
    When I click the "Composition Mode" tab
    And I click the first button containing "public"
    Then the "[data-testid='LOCATION_DETAIL_VIEW'] table" table should have "10" rows

  @react
  Scenario: Composition mode locations view with pageSize 5 shows 5 items per page
    When I click the "Composition Mode" tab
    Then the "[data-testid='LOCATIONS_VIEW'] table" table should have "5" rows

  @react
  Scenario: Composition mode upload view with pageSize 10 shows 10 items per page
    When I click the "Composition Mode" tab
    And I click the first button containing "public"
    And I click the "Menu Toggle" button
    And I click the "Upload" menuitem
    And I upload "15" files with random names
    Then the "[data-testid='UPLOAD_VIEW'] table" table should have "10" rows






