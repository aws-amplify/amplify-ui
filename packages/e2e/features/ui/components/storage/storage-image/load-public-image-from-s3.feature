Feature: Load an image from S3 with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-image/public-image"

  @react
  Scenario: I successfully load a public image
    Then I see "Loader1" element
    Then I see "Loader2" element
    Then I see the "public cat 1" image
    Then I see the "public cat 2" image
    Then I see "The first public image is loaded."
    Then I see "The second public image is loaded."
    