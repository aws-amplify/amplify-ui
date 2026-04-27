Feature: StorageBrowser cross-page search

  Tests that search works across multiple pages of results,
  including pagination of search results and subfolder search.

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Search returns results from across pages
    When I click the first button containing "public"
    When I see input with placeholder "Search current folder" and type "DO_NOT"
    Then I click the "Search" button
    Then I see the button containing "DO_NOT_DELETE"

  @react
  Scenario: Clearing search returns to normal browsing
    When I click the first button containing "public"
    Then I see the button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    When I see input with placeholder "Search current folder" and type "DO_NOT"
    Then I click the "Search" button
    Then I see the button containing "DO_NOT_DELETE"
    Then I do not see the button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    When I click the button containing "Clear search"
    Then I see the button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"

  @react
  Scenario: Search with no results shows empty state
    When I click the first button containing "public"
    When I see input with placeholder "Search current folder" and type "zzz_nonexistent_item_xyz"
    Then I click the "Search" button
    Then I see "No files"
    When I click the button containing "Clear search"
    Then I do not see "No files"

  @react
  Scenario: Search with subfolders enabled finds items in nested folders
    When I click the first button containing "public"
    When I click the "Include Subfolders" checkbox
    When I see input with placeholder "Search current folder" and type "DELETE"
    Then I click the "Search" button
    Then I see "DO_NOT_DELETE/DONT_DELETE_SUB"

  @react
  Scenario: Search without subfolders does not show nested items
    When I click the first button containing "public"
    When I see input with placeholder "Search current folder" and type "DO_NOT"
    Then I click the "Search" button
    Then I see the button containing "DO_NOT_DELETE"
    Then I do not see the button containing "DO_NOT_DELETE/DONT_DELETE_SUB"
