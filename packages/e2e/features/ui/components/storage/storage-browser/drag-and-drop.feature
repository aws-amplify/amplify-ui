Feature: Drag and drop files within Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
  
  @react
  Scenario: Drag and drop file into Location Detail view
      When I type my "email" with status "CONFIRMED"
      Then I type my password
      Then I click the "Sign in" button
      When I click the button containing "public"
      When I drag and drop a file into the storage browser with file name "test.txt"
      Then I see "Upload Files"
      Then I see "test.txt"

  @react
  Scenario: Drag and drop file into Upload Action view
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the button containing "public"
    Then I see the "Actions" button
    When I click the "Actions" button
    Then I see the "Upload Files" menuitem
    # Close the file select menu
    Then I press the "{esc}" key
    When I drag and drop a file into the storage browser with file name "test.txt"
    Then I see "test.txt"
