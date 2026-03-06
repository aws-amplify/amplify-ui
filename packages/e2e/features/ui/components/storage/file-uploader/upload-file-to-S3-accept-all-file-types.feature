Feature: File Uploader accepts all file types

  Background:
    Given I'm running the example "ui/components/storage/file-uploader/accept-all-file-types"

  @react
  Scenario: I should be able to click and drag any files
    Then I see "Browse files"
    Then I drag and drop a file with file name "test.txt"
    Then I see "test.txt"
    Then I see "Uploaded"
