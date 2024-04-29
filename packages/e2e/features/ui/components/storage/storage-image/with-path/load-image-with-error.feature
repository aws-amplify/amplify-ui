Feature: Load an image from S3 with error

  Background:
    Given I'm running the example "ui/components/storage/storage-image/with-path/error"

  @react
  Scenario: I load an image with error
    I see "Loader" element
    Then I see "Error getting image:" 