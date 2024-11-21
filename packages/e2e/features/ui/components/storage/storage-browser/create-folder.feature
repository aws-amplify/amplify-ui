Feature: Create folder with Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Create folder successfully creates a new empty folder
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    When I click the first button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Create Folder" menuitem
    When I click the "Create Folder" menuitem
    Then I see "Folder name"
    Then I see the "Create Folder" button
    Then the "Create Folder" button is disabled
    When I type a new "Folder name" with random value
    Then I see the "Create Folder" button
    When I click the "Create Folder" button
    Then I see "Folder created"
    # verify folder creation
    When I click the "Exit" button
    Then I click the button containing random name
    Then I see "No files"
    # TODO: delete created folder

  @react
  Scenario: Create folder fails on overwrite of existing folder name
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Create Folder" menuitem
    When I click the "Create Folder" menuitem
    Then I see "Folder name"
    Then I see the "Create Folder" button
    Then the "Create Folder" button is disabled
    When I type a new "Folder name" with value "Blackberry"
    Then I see the "Create Folder" button
    When I click the "Create Folder" button
    Then I see "A folder already exists with the provided name"

  @react
  Scenario: Create folder input shows error message when folder name contains "/"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Create Folder" menuitem
    When I click the "Create Folder" menuitem
    Then I see "Folder name"
    Then I see the "Create Folder" button
    Then the "Create Folder" button is disabled 
    When I type a new "Folder name" with value "Blackberry/"
    When I lose focus on "Folder name" input
    Then I see 'Folder name cannot contain \"/\", nor end or start with \".\"'
