Feature: Storage Browser denied access without sufficient permissions

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Attempt to access forbidden folder
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I see the "Sign in" button
    When I click the "Sign in" button
    When I click the button containing "forbidden"
    When I make a "GET" request to "https://fileuploaderbucket121216-dev.s3.us-east-2.amazonaws.com/?list-type=2&delimiter=%2F&max-keys=1000&prefix=forbidden%2F" it returns a status code of "403"
  
  
  @react
  Scenario: Attempt to add folder without write access
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I see the "Sign in" button
    When I click the "Sign in" button
    When I click the button containing "forbidden"
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
    When I make a "POST" request to "https://fileuploaderbucket121216-dev.s3.us-east-2.amazonaws.com/forbidden/Blackberry/?uploads" it returns a status code of "403"