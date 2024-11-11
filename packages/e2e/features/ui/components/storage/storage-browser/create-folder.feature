Feature: Create folder with Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
  
  @react
  Scenario: Create folder fails on overwrite of existing folder name
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Actions" button
    When I click the "Actions" button
    Then I see the "Create Folder" menuitem
    When I click the "Create Folder" menuitem
    Then I see "Enter folder name:"
    Then I see the "Create Folder" button
    Then the "Create Folder" button is disabled 
    When I type a new "Enter folder name:" with value "Blackberry"
    Then I see the "Create Folder" button
    When I click the "Create Folder" button
    Then I see "A folder already exists with the provided name"

  @react
  Scenario: Create folder input shows error message when folder name contains "/"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see the "Actions" button
    When I click the "Actions" button
    Then I see the "Create Folder" menuitem
    When I click the "Create Folder" menuitem
    Then I see "Enter folder name:"
    Then I see the "Create Folder" button
    Then the "Create Folder" button is disabled 
    When I type a new "Enter folder name:" with value "Blackberry/"
    When I lose focus on "Enter folder name:" input
    Then I see "Folder name cannot contain a \"/\" or \".\" character"
