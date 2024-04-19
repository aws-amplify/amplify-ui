Feature: Load an image from S3 with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-image/public-access-level"

  @react
  Scenario: I successfully load a public image
    Then I see "Loader" element
    Then I see the "public cat" image
    Then I see "The public image is loaded."
