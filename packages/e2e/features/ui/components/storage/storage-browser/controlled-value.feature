Feature: StorageBrowser Controlled Behavior

  Background:
    Given I'm running the example "/"
  
  @react-router
  Scenario: Handles legacy controlled props
    Then I see the "Legacy Controlled" link
    When I click the "Legacy Controlled" link
    Then I see the "my-deeply-nested-prefix/" button
    When I click the "my-deeply-nested-prefix/" button
    Then I see the "No files." message
    When I go back to the previous page
    Then I see the "my-deeply-nested-prefix/" button
    When I go forward to the next page
    Then I see the "No files." message

  @react-router @next-app-router
  Scenario: Handles controlled value prop
    Then I see the "Controlled Value" link
    When I click the "Controlled Value" link
    Then I see the "my-deeply-nested-prefix/" button
    When I click the "my-deeply-nested-prefix/" button
    Then I see the "No files." message
    When I go back to the previous page
    Then I see the "my-deeply-nested-prefix/" button
    When I go forward to the next page
    Then I see the "No files." message
    
