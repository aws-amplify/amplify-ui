Feature: StorageBrowser File Validation Behavior

  Background:
    Given I'm running the example "/"
    And I see the "File Validation" link
    And I click the "File Validation" link
  
  @react-router @next-app-router
  Scenario: Add files successfully adds file that passes custom file validation
    When I click the "my-prefix/" button
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Upload" menuitem
    When I click the "Upload" menuitem
    Then the "Upload" button is disabled
    Then I upload "1" valid files of size 1MB and type jpeg with random names
    Then I see "Not started"
    
  @react-router @next-app-router
  Scenario: Add files shows error message when file fails custom file validation
    When I click the "my-prefix/" button
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Upload" menuitem
    When I click the "Upload" menuitem
    Then the "Upload" button is disabled
    Then I upload "1" invalid files with size greater than 1MB with random names
    Then I see "Invalid files"
