
Feature: Upload a file to S3 with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-manager/default-files"

  @react
  Scenario: Storage Manager renders with default files
    Then I see "Browse files"
    And I see "default.jpg"
    And I see "Uploaded successfully"
   