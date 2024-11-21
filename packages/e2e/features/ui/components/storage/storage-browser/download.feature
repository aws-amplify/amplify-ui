Feature: Download on Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"

  @react
  Scenario: Download is available for files
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see download for file "001_dont_delete_file.txt"
    Then I click and see download succeed for "001_dont_delete_file.txt"

  @react
  Scenario: Download is not available for folder
    When I type my "email" with status "CONFIRMED"
    Then I type my password
    Then I click the "Sign in" button
    When I click the first button containing "public"
    Then I see no download for folder "DO_NOT_DELETE"
