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

  @react
  Scenario: upload, list, copy and delete a file using toggle menu
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    # upload file
    Then I see the "Upload" menuitem
    When I click the "Upload" menuitem
    Then the "Upload" button is disabled
    Then I upload "1" files with random names
    Then I see "Not started"
    Then I click the label containing text "Overwrite existing files"
    When I click the "Upload" button
    Then I see "100%"
    Then I see "All files uploaded"
    When I click the "Exit" button
    # list uploaded file
    Then I see "1" files with random names
    # copy file
    Then I click checkbox for with "1" files with random names
    When I click the "Menu Toggle" button
    When I click the "Copy" menuitem
    Then I see "Copy destination"
    Then I click the "DoNotDeleteThisFolder_CanDeleteAllChildren/" button
    Then I click the "Copy" button
    Then I see "All files copied"
    When I click the "Exit" button
    # delete file
    Then I click checkbox for with "1" files with random names
    When I click the "Menu Toggle" button
    Then I click the "Delete" menuitem
    Then I click the "Delete" button
    Then I see "All files deleted"
    When I click the "Exit" button
    # delete file copy
    When I click the first button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    Then I click checkbox for with "1" files with random names
    When I click the "Menu Toggle" button
    Then I click the "Delete" menuitem
    Then I click the "Delete" button
    Then I see "All files deleted"

  @react
  Scenario: upload a folder
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    # upload file
    Then I see the "Upload" menuitem
    When I click the "Upload" menuitem
    Then the "Upload" button is disabled
    Then I upload a folder "e2eTemp" with "2" files with random names
    Then I see "Not started"
    Then I click the label containing text "Overwrite existing files"
    When I click the "Upload" button
    Then I see "100%"
    Then I see "All files uploaded"
    When I click the "Exit" button
    # list uploaded file
    When I click the first button containing "e2eTemp"
    Then I see "2" files with random names
    # delete created file
    Then I click the element with id attribute "header-checkbox"
    When I click the "Menu Toggle" button
    Then I click the "Delete" menuitem
    Then I click the "Delete" button
    Then I see "All files deleted"
    When I click the "Exit" button
    # verify all files are deleted
    Then I see "No files"

