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
    Then the table should have "5" rows

  @react
  Scenario: Standard mode with pageSize 10 shows 10 items per page
    When I select "10" from the "Global Page Size" dropdown
    And I wait 2 seconds
    And I click the first button containing "public"
    Then the table should have "10" rows

  @react
  Scenario: Composition mode detail view with pageSize 10 shows 10 items per page
    When I click the "Composition Mode" tab
    And I click the first button containing "public"
    Then the "[data-testid='LOCATION_DETAIL_VIEW'] table" table should have "10" rows

  @react
  Scenario: Backward compatibility - Copy view without pageSize shows all items
    When I click the "Composition Mode" tab
    And I click the first button containing "public"
    And I click the first checkbox in the table
    And I click the "Menu Toggle" button
    And I click the "Copy" menuitem
    Then I do not see the "Previous" button in the "copy" view

  @react
  Scenario: Backward compatibility - Delete view without pageSize shows all items
    When I click the "Composition Mode" tab
    And I click the first button containing "public"
    And I click the first checkbox in the table
    And I click the "Menu Toggle" button
    And I click the "Delete" menuitem
    Then I do not see the "Previous" button in the "delete" view

  @react
  Scenario: Backward compatibility - Download view without pageSize shows all items
    When I click the "Composition Mode" tab
    And I click the first button containing "public"
    And I click the first checkbox in the table
    And I click the "Menu Toggle" button
    And I click the "Download" menuitem
    Then I do not see the "Previous" button in the "download" view





