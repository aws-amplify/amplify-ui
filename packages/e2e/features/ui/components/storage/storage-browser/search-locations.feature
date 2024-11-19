Feature: Search with Storage Browser

    Background:
        Given I'm running the example "ui/components/storage/storage-browser/default-auth"

    @react
    Scenario: Basic search returns correct results
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the button containing "100"
    When I see input with placeholder "Search current folder" and type "DO_NOT"
    Then I click the "Search" button
    Then I see the button containing "DO_NOT_DELETE"
    Then I do not see the button containing "100"
    # Verify clear returns to initial state
    When I click the button containing "Clear search"
    Then I see the button containing "100"

    @react
    Scenario: Search within sub-directories
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    When I see input with placeholder "Search current folder" and type "DELETE"
    Then I click the "Search" button
    Then I do not see the button containing "DO_NOT_DELETE/DONT_DELETE_SUB"
    When I click the button containing "Clear search"
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

    @react
    Scenario: Paginated search results
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I click the first button containing "public"
    Then I click the button containing "100"
    When I see input with placeholder "Search current folder" and type "10"
    Then the "Go to next page" button is disabled
    When I see input with placeholder "Search current folder" and type "copy"
    Then the "Go to next page" button is enabled
