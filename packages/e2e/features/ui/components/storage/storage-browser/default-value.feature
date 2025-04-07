Feature: StorageBrowser Initialize Default Value

  Background:
    Given I'm running the example "/"
  
  @react-router
  Scenario: Handles defaultValue prop
    Then I see the "Default Value" link
    When I click the "Default Value" link
    Then I see the "my-deeply-nested-prefix/" button
    When I click the "my-deeply-nested-prefix/" button
    Then I see the "No files." message
    When I go back to the previous page
    Then I see the "Default Value" link
    