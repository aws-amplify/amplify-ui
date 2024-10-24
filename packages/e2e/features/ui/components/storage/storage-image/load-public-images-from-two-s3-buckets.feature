Feature: Load two images, each from a different S3 bucket with public access level settings

  Background:
    Given I'm running the example "ui/components/storage/storage-image/multi-bucket"

  @react
  Scenario: I successfully load two images from two buckets
    Then I see "Loader1" element
    Then I see "Loader2" element
    Then I see the "public cat 1" image
    Then I see the "public cat 2" image
    Then I see "The first public image is loaded."
    Then I see "The second public image is loaded."
