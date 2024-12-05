Feature: Search with Storage Browser

    Background:
        Given I'm running the example "ui/components/storage/storage-browser/default-auth"

    @react
    Scenario: Search folders and subfolders with matching results
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    When I see input with placeholder "Search current folder" and type "DO_NOT"
    Then I click the "Search" button
    Then I see the button containing "DO_NOT_DELETE"
    Then I do not see the button containing "DO_NOT_DELETE/DONT_DELETE_SUB"
    Then I do not see the button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    # Verify clear returns to initial state
    When I click the button containing "Clear search"
    Then I see the button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    # Verify subfolder results
    When I click the "Include Subfolders" checkbox
    When I see input with placeholder "Search current folder" and type "DELETE"
    Then I click the "Search" button
    Then I see "DO_NOT_DELETE/DONT_DELETE_SUB"

    @react
    Scenario: Search with no matching results
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    When I see input with placeholder "Search current folder" and type "XXXXXXXX"
    Then I click the "Search" button
    Then I see "No files"
    # Verify clear removes message
    Then I click the button containing "Clear search"
    Then I do not see "No files"
