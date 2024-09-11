Feature: File Uploader with default files

  Background:
    Given I'm running the example "ui/components/storage/file-uploader/accept-all-file-types-access-level"

  @react
  Scenario: I should be able to click and drag any files
    Then I see "Browse files"
    Then I drag and drop a file with file name "test.txt"
    Then I see "test.txt"
    Then I see "Uploaded"
