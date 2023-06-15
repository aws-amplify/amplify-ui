Feature: Load an image from S3 with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-image/public-access-level"

  @react
  Scenario: I successfully load an image
    Then I see "The image is loading."
    Then I see "The image is loaded."
