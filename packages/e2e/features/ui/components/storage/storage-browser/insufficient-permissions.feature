Feature: Storage Browser denied access without sufficient permissions

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Attempt to access forbidden folder
    Given I intercept a "GET" request to "/?list-type=2&delimiter=%2F&max-keys=101&prefix=forbidden%2F"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I see the "Sign in" button
    When I click the "Sign in" button
    When I click the button containing "forbidden"
    Then I confirm the "GET" request has a status of "403"

  @react
  Scenario: Attempt to add folder without write access
    Given I intercept a "POST" request to "forbidden/Blackberry/?uploads"
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
    Then I confirm the "POST" request has a status of "403"
