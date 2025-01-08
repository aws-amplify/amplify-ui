Feature: Drag and drop files within Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
  
  @react
  Scenario: Drag and drop file into Location Detail view
      When I click the first button containing "public"
      When I drag and drop a file into the storage browser with file name "test.txt"
      Then I see "Upload"
      Then I see "test.txt"

  @react
  Scenario: Drag and drop folder into Location Detail view
      When I click the first button containing "public"
      When I drag and drop a folder into the storage browser with name "test"
      Then I see "Upload"
      Then I see "test"
  
  @react
  Scenario: Drag and drop file into Upload Action view
    When I click the first button containing "public"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Upload" menuitem
    Then I click the "Upload" menuitem
    # Close the file select menu
    Then I press the "{esc}" key
    When I drag and drop a file into the storage browser with file name "test.txt"
    Then I see "test.txt"

