Feature: Storage Manager with default files

  Background:
    Given I'm running the example "ui/components/storage/storage-manager/default-files"

  @react
  Scenario: Storage Manager renders with default files
    Then I see "Browse files"
    And I see "default.jpg"
    And I see "Uploaded successfully"
   
  @react
  Scenario: I should not be able to upload more files
    Then I see "Browse files"
    And I select a file with file name "test.jpg" and another file with file name "test2.jpg"
    Then I see "Cannot choose more than 1 file. Remove files before updating"
    And I don't see "2 files uploaded"
