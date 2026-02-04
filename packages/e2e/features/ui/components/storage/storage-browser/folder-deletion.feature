Feature: Folder deletion with Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Delete empty folder successfully
    When I click the first button containing "public"
    When I click the first button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Create Folder" menuitem
    When I click the "Create Folder" menuitem
    When I type a new "Folder name" with random value
    When I click the "Create Folder" button
    Then I see "Folder created"
    When I click the "Exit" button
    # Delete the created folder
    Then I click checkbox for button containing random name
    When I click the "Menu Toggle" button
    Then I click the "Delete" menuitem
    Then I click the "Delete" button
    Then I see modal with title "Confirm Deletion"
    Then I see modal message "The items that will be deleted contain 1 folder"
    Then I see modal content "Folder list:"
    When I click the modal "Delete" button
    Then I see "1 folder deleted"

  @react
  Scenario: Delete mixed selection of folder and file
    When I click the first button containing "public"
    When I click the first button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    # Create a test folder
    When I click the "Menu Toggle" button
    When I click the "Create Folder" menuitem
    When I type a new "Folder name" with random value
    When I click the "Create Folder" button
    Then I see "Folder created"
    When I click the "Exit" button
    # Upload a test file
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "1" files with random names
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    # Verify both items are visible
    Then I see folder button containing random name
    Then I see "1" files with random names
    # Select both folder and file for deletion
    Then I click checkbox for folder containing random name
    Then I click checkbox for file containing random name
    # Verify items are selected before accessing menu
    Then I see the "Menu Toggle" button
    When I click the "Menu Toggle" button
    Then I see the "Delete" menuitem
    Then I click the "Delete" menuitem
    Then I click the "Delete" button
    Then I see modal with title "Confirm Deletion"
    Then I see modal message "The items that will be deleted contain 1 folder"
    Then I see modal content "Folder list:"
    When I click the modal "Delete" button
    Then I see "1 folder and 1 file deleted successfully"


  @react
  Scenario: Delete folder with files inside
    When I click the first button containing "public"
    When I click the first button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    # Upload files into a folder (this creates the folder automatically)
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload a folder "testFolder" with "2" files with random names
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    # Delete the folder containing files
    Then I click checkbox for button containing "testFolder"
    When I click the "Menu Toggle" button
    Then I click the "Delete" menuitem
    Then I click the "Delete" button
    Then I see modal with title "Confirm Deletion"
    When I click the modal "Delete" button
    Then I see "1 folder deleted"

