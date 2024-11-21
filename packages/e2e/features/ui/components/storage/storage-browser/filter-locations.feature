Feature: StorageBrowser Filter Locations

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
  
  @react
  Scenario: Filter locations
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see the first button containing "private"
    When I see input with placeholder "Filter folders and files" and type "pu"
    Then I click the "Search" button
    Then I see the first button containing "public"
    Then I do not see the button containing "private"
    When I click the button containing "Clear search"
    Then I see the first button containing "private"
    
