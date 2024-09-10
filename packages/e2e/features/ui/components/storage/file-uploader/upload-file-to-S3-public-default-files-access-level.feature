Feature: File Uploader with default files

  Background:
    Given I'm running the example "ui/components/storage/file-uploader/default-files-access-level"

  @react
  Scenario: File Uploader renders with default files
    Then I see "Browse files"
    Then I see "default.jpg"
    Then I see "Uploaded"

  @react
  Scenario: I should not be able to upload more files
    Then I see "Browse files"
    Then I select a file with file name "test.jpg" and another file with file name "test2.jpg"
    Then I see "Cannot choose more than 1 file. Remove files before updating"
    Then I don't see "2 files uploaded"
