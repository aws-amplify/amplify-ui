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
    Then I upload "1" valid files with random names
    Then I see "Not started"
    
  @react-router @next-app-router
  Scenario: Add files shows error message when file fails custom file validation
    When I click the "my-prefix/" button
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Upload" menuitem
    When I click the "Upload" menuitem
    Then the "Upload" button is disabled
    Then I upload "1" invalid files with random names
    Then I see "Only image files (PNG/JPEG/GIF) below 1 MB in size are accepted."
