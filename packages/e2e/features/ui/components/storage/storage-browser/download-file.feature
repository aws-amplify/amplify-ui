Feature: Download file with storage browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Download file "test.txt"
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    Then I see the "Sign Out" button
    Then I see "Home"
    Then I click the button containing "public"
    Then I see "test.txt"
    Then I click the "Download public/test.txt" button
    Then I verify the downloaded file "test.txt" has the contents "file contents"
    