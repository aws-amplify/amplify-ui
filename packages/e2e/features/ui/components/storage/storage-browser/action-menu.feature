Feature: Create folder with Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Create folder successfully creates a new empty folder
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
    When I click the first button containing "public"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    # upload file
    Then I see the "Upload" menuitem
    When I click the "Upload" menuitem
    Then I upload a folder "e2eTemp" with "2" files with random names
    Then I see "Not started"
    Then I click the label containing text "Overwrite existing files"
    When I click the "Upload" button
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

  @react
  Scenario: Upload file shows a Network error if offline
      When I click the first button containing "public"
      Then I see the "Menu Toggle" button
      When I click the "Menu Toggle" button
      Then I see the "Upload" menuitem
      When I click the "Upload" menuitem
      Then I upload "1" files with random names
      When A network failure occurs
      Then I click the "Upload" button
      Then I see "All files failed to upload"

  @react
  Scenario: List location items shows a Network error if offline
      When I see the first button containing "public"
      When A network failure occurs
      Then I click the first button containing "public"
      Then I see "Network Error"

  @react
  Scenario: Create folder shows a Network error if offline
      When I click the first button containing "public"
      Then I see the "Menu Toggle" button
      When I click the "Menu Toggle" button
      Then I see the "Create Folder" menuitem
      When I click the "Create Folder" menuitem
      Then I see "Folder name"
      Then I type a new "Folder name" with random value
      When A network failure occurs
      Then I click the "Create Folder" button
      Then I see "There was an issue creating the folder"

  @react
  Scenario: Copy file shows a Network error if offline
      When I click the first button containing "public"
      Then I click checkbox for file "001_dont_delete_file.txt"
      When I click the "Menu Toggle" button
      When I click the "Copy" menuitem
      Then I click the "DoNotDeleteThisFolder_CanDeleteAllChildren/" button
      When A network failure occurs
      Then I click the "Copy" button
      Then I see "All files failed to copy"

  @react
  Scenario: Delete file shows a Network error if offline
      When I click the first button containing "public"
      Then I click checkbox for file "001_dont_delete_file.txt"
      When I click the "Menu Toggle" button
      Then I click the "Delete" menuitem
      When A network failure occurs
      Then I click the "Delete" button
      Then I see "All files failed to delete"
